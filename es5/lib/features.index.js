"use strict";

var _commonJs = require("./common.js");

var yeoman = require("yeoman-generator");

module.exports = yeoman.generators.Base.extend({
	initializing: function yoInitializing() {
		this.pkg = require("../../package.json");
	},

	prompting: function yoPrompt() {
		var done = this.async();

		var prompts = (0, _commonJs.getPrompts)();

		this.prompt(prompts, (function (props) {
			this.props = props;

			done();
		}).bind(this));
	},

	writing: function yoWriting() {
		var _this = this;

		var context = (0, _commonJs.processContext)(this.props);

		//copy feature steps
		["_model.show.steps.js", "_model.create.steps.js", "_model.update.steps.js", "_model.delete.steps.js", "_model.list.steps.js"].forEach(function (templatePath) {
			var newName = templatePath.replace("_model", "" + context.name);
			_this.fs.copyTpl(_this.templatePath("es6/features/steps/" + templatePath), _this.destinationPath("es6/features/steps/" + context.name + "/" + newName), context);
		}, this);

		//copy features
		["_model.show.feature", "_model.create.feature", "_model.update.feature", "_model.delete.feature", "_model.list.feature"].forEach(function (templatePath) {
			var newName = templatePath.replace("_model", "" + context.name);
			_this.fs.copyTpl(_this.templatePath("features/" + templatePath), _this.destinationPath("features/" + context.name + "/" + newName), context);
		}, this);

		//copy access token feature
		["_accessToken.feature"].forEach(function (templatePath) {
			var newName = templatePath.replace("_", "");
			_this.fs.copyTpl(_this.templatePath("features/" + templatePath), _this.destinationPath("features/" + newName), context);
		}, this);
	},

	install: function yoInstall() {
		this.installDependencies({
			skipInstall: true
		});
	}
});