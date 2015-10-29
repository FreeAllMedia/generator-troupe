var yeoman = require("yeoman-generator");
var chalk = require("chalk");
var yosay = require("yosay");

import {processContext, getPrompts} from "./common.js";

module.exports = yeoman.generators.Base.extend({
	initializing: function yoInitializing() {
		this.pkg = require("../../package.json");
	},

	prompting: function yoPrompt() {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			"Welcome to the stylish " + chalk.red("FamScudl") + " generator! our base path is " + this.destinationRoot()
		));

		var prompts = getPrompts();

		this.prompt(prompts, function (props) {
			this.props = props;
			done();
		}.bind(this));
	},

	writing: function yoWriting() {
		const context = processContext(this.props);

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

		//copy model
		this.fs.copyTpl(
			this.templatePath(`es6/app/models/_model.js`),
			this.destinationPath(`es6/app/models/${context.name}.js`),
			context
		);

		//copy model spec
		this.fs.copyTpl(
			this.templatePath(`es6/spec/_model.spec.js`),
			this.destinationPath(`es6/spec/models/${context.name}.spec.js`),
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
