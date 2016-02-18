var yeoman = require("yeoman-generator");
var chalk = require("chalk");
var yosay = require("yosay");

import inflect from "jargon";

module.exports = yeoman.Base.extend({
	initializing: function yoInitializing() {
		this.pkg = require("../../package.json");
	},

	prompting: function yoPrompt() {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			"Welcome to the stylish " + chalk.red("FamScudl") + " generator! our base path is " + this.destinationRoot()
		));

		var prompts = [{
			type: "input",
			name: "name",
			message: "What is the model name? (use camel case please)",
			default: "myModel"
		},
		{
			type: "input",
			name: "attributeString",
			message: "Provide the model attributes sepparated by a comma? (like name,link,email,contactPhone)",
			default: "name"
		}];

		this.prompt(prompts, function (props) {
			this.props = props;
			done();
		}.bind(this));
	},

	writing: function yoWriting() {
		const context = {
			name: this.props.name,
			Name: inflect(this.props.name).pascal.toString(),
			names: inflect(this.props.name).plural.toString(),
			_name: inflect(this.props.name).snake.toString(),
			attributes: this.props.attributes,
			attributeString: this.props.attributeString
		};

		context.attributes = context.attributeString.split(",");

		//filling a strings that are going to be used in the templates to mock a test entity
		context.attributesWithValues = "";
		context.fieldsWithValues = "";
		context.validateString = "";
		context.attributes.forEach(
			(attributeName, index) => {
				if(index > 0) {
					const breakLine = ",\n";
					context.attributesWithValues += breakLine;
					context.fieldsWithValues += breakLine;
					context.validateString += breakLine;
				}
				const snakeAttributeName = inflect(attributeName).snake.toString();
				context.attributesWithValues += `\"${attributeName}\": \"test ${attributeName}\"`;
				context.fieldsWithValues += `\"${snakeAttributeName}\": ${context.name}.${attributeName}`;
				context.validateString += `this.ensure(\"${attributeName}\", isNotEmpty);`;
			});
		context.attributesJson = JSON.stringify(context.attributesWithValues);

		//copy feature steps
		["_model.show.steps.js",
		"_model.create.steps.js",
		"_model.update.steps.js",
		"_model.delete.steps.js",
		"_model.list.steps.js"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("_model", `${context.name}`);
			this.fs.copyTpl(
				this.templatePath("es6/features/steps/" + templatePath),
				this.destinationPath(`es6/features/steps/${context.name}/${newName}`),
				context
			);
		}, this);

		//copy controllers
		["_modelController.js"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("_model", `${context.name}`).replace("_", "");
			this.fs.copyTpl(
				this.templatePath(`es6/app/controllers/${templatePath}`),
				this.destinationPath(`es6/app/controllers/${newName}`),
				context
			);
		}, this);

		//copy managers
		["_modelManager.js"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("_model", `${context.name}`).replace("_", "");
			this.fs.copyTpl(
				this.templatePath(`es6/app/managers/${templatePath}`),
				this.destinationPath(`es6/app/managers/${newName}`),
				context
			);
		}, this);

		//copy model
		this.fs.copyTpl(
			this.templatePath(`es6/app/models/_model.js`),
			this.destinationPath(`es6/app/models/${context.name}.js`),
			context
		);

		//copy model spec
		this.fs.copyTpl(
			this.templatePath(`es6/spec/_model.spec.js`),
			this.destinationPath(`es6/spec/${context.name}.spec.js`),
			context
		);

		//copy routers
		["_modelRouter.js",
		"_modelRoutes.js"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("_model", `${context.name}`).replace("_", "");
			this.fs.copyTpl(
				this.templatePath(`es6/app/routers/${templatePath}`),
				this.destinationPath(`es6/app/routers/${newName}`),
				context
			);
		}, this);
	},

	install: function yoInstall() {
		this.installDependencies({
			skipInstall: true
		});
	}
});
