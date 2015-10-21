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

		//copy common steps
		["_common.steps.js",
		"_accessToken.steps.js"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("_", "");
			this.fs.copyTpl(
				this.templatePath(`es6/features/steps/${templatePath}`),
				this.destinationPath(`es6/features/steps/${newName}`),
				context
			);
		}, this);

		//copy common functions
		["_jsonWebToken.js",
		"_language.js",
		"_request.js",
		"_values.js"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("_", "");
			this.fs.copyTpl(
				this.templatePath(`es6/features/steps/common/${templatePath}`),
				this.destinationPath(`es6/features/steps/common/${newName}`),
				context
			);
		}, this);

		//copy support files
		["_hooks.js",
		"_world.js"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("_", "");
			this.fs.copyTpl(
				this.templatePath(`es6/features/support/${templatePath}`),
				this.destinationPath(`es6/features/support/${newName}`),
				context
			);
		}, this);

		//copy controllers
		["_applicationController.js"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("_model", `${context.name}`).replace("_", "");
			this.fs.copyTpl(
				this.templatePath(`es6/app/controllers/${templatePath}`),
				this.destinationPath(`es6/app/controllers/${newName}`),
				context
			);
		}, this);

		//copy managers
		["_accountManager.js"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("_model", `${context.name}`).replace("_", "");
			this.fs.copyTpl(
				this.templatePath(`es6/app/managers/${templatePath}`),
				this.destinationPath(`es6/app/managers/${newName}`),
				context
			);
		}, this);

		//copy misc
		["_errors.js",
		"_server.js"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("_", "");
			this.fs.copyTpl(
				this.templatePath(`es6/app/${templatePath}`),
				this.destinationPath(`es6/app/${newName}`),
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
