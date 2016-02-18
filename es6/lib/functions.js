import yeoman from "yeoman-generator";
import jargon from "jargon";

module.exports = yeoman.Base.extend({
	initializing: function yoInitializing() {
		this.pkg = require("../../package.json");
	},

	prompting: function yoPrompt() {
		var done = this.async();

		var prompts = [{
			type: "input",
			name: "modelName",
			message: "What is the model name? (use camel case please)",
			default: "myModel"
		}];

		this.prompt(prompts, function (props) {
			this.props = props;

			done();
		}.bind(this));
	},

	writing: function yoWriting() {
		const context = {
			modelName: this.props.modelName,
			modelNamePluralPascal: jargon(this.props.modelName).plural.pascal.toString(),
			modelNamePascal: jargon(this.props.modelName).pascal.toString(),
			modelNamePlural: jargon(this.props.modelName).plural.toString(),
			modelTableName: jargon(this.props.modelName).plural.snake.toString()
		};

		//copy functions
		["modelsShow.js",
		"modelsCreate.js",
		"modelsUpdate.js",
		"modelsDelete.js",
		"modelsList.js"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("models", `${context.modelNamePlural}`);
			this.fs.copyTpl(
				this.templatePath(`source/lib/lambdas/models/${templatePath}`),
				this.destinationPath(`source/lib/lambdas/${context.modelNamePlural}/${newName}`),
				context
			);
		});

		//copy specs
		["modelsShow.spec.js",
		"modelsCreate.spec.js",
		"modelsUpdate.spec.js",
		"modelsDelete.spec.js",
		"modelsList.spec.js"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("models", `${context.modelNamePlural}`);
			this.fs.copyTpl(
				this.templatePath(`spec/lambdas/models/${templatePath}`),
				this.destinationPath(`spec/lambdas/${context.modelNamePlural}/${newName}`),
				context
			);
		});

		//copy steps
		["deleteModels.js",
		"fetchModels.js",
		"listModels.js",
		"saveModels.js"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("Models", `${context.modelNamePluralPascal}`);
			this.fs.copyTpl(
				this.templatePath(`source/lib/steps/models/${templatePath}`),
				this.destinationPath(`source/lib/steps/${context.modelNamePlural}/${newName}`),
				context
			);
		});

		//copy step specs
		["deleteModels.spec.js",
		"fetchModels.spec.js",
		"listModels.spec.js",
		"saveModels.spec.js"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("Models", `${context.modelNamePluralPascal}`);
			this.fs.copyTpl(
				this.templatePath(`spec/steps/models/${templatePath}`),
				this.destinationPath(`spec/steps/${context.modelNamePlural}/${newName}`),
				context
			);
		});

		//copy functions for deployment
		["modelsFunctions.js"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("models", `${context.modelNamePlural}`);
			this.fs.copyTpl(
				this.templatePath(`source/lib/api/models/${templatePath}`),
				this.destinationPath(`source/lib/api/${context.modelNamePlural}/${newName}`),
				context
			);
		});

		//copy function specs for deployment
		["modelsFunctions.spec.js"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("models", `${context.modelNamePlural}`);
			this.fs.copyTpl(
				this.templatePath(`spec/api/models/${templatePath}`),
				this.destinationPath(`spec/api/${context.modelNamePlural}/${newName}`),
				context
			);
		});
	}
});
