var yeoman = require("yeoman-generator");

import {processContext, getPrompts} from "./common.js";

module.exports = yeoman.generators.Base.extend({
	initializing: function yoInitializing() {
		this.pkg = require("../../package.json");
	},

	prompting: function yoPrompt() {
		var done = this.async();

		var prompts = getPrompts();

		this.prompt(prompts, function (props) {
			this.props = props;

			done();
		}.bind(this));
	},

	writing: function yoWriting() {
		const context = processContext(this.props);

		//copy feature steps
		["_model.show.steps.js",
		"_model.create.steps.js",
		"_model.update.steps.js",
		"_model.delete.steps.js",
		"_model.list.steps.js"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("_model", `${context.name}`);
			this.fs.copyTpl(
				this.templatePath(`es6/features/steps/${templatePath}`),
				this.destinationPath(`es6/features/steps/${context.name}/${newName}`),
				context
			);
		}, this);

		//copy features
		["_model.show.feature",
		"_model.create.feature",
		"_model.update.feature",
		"_model.delete.feature",
		"_model.list.feature"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("_model", `${context.name}`);
			this.fs.copyTpl(
				this.templatePath(`features/${templatePath}`),
				this.destinationPath(`features/${context.name}/${newName}`),
				context
			);
		}, this);

		//copy access token feature
		["_accessToken.feature"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("_", "");
			this.fs.copyTpl(
				this.templatePath(`features/${templatePath}`),
				this.destinationPath(`features/${newName}`),
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
