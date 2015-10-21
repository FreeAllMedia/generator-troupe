"use strict";

var _commonJs = require("./common.js");

var yeoman = require("yeoman-generator");
var chalk = require("chalk");
var yosay = require("yosay");

module.exports = yeoman.generators.Base.extend({
	initializing: function yoInitializing() {
		this.pkg = require("../../package.json");
	},

	prompting: function yoPrompt() {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay("Welcome to the stylish " + chalk.red("FamScudl") + " generator! our base path is " + this.destinationRoot()));

		var prompts = (0, _commonJs.getPrompts)();

		this.prompt(prompts, (function (props) {
			this.props = props;
			done();
		}).bind(this));
	},

	writing: function yoWriting() {
		var _this = this;

		var context = (0, _commonJs.processContext)(this.props);

		//copy common steps
		["_common.steps.js", "_accessToken.steps.js"].forEach(function (templatePath) {
			var newName = templatePath.replace("_", "");
			_this.fs.copyTpl(_this.templatePath("es6/features/steps/" + templatePath), _this.destinationPath("es6/features/steps/" + newName), context);
		}, this);

		//copy common functions
		["_jsonWebToken.js", "_language.js", "_request.js", "_values.js"].forEach(function (templatePath) {
			var newName = templatePath.replace("_", "");
			_this.fs.copyTpl(_this.templatePath("es6/features/steps/common/" + templatePath), _this.destinationPath("es6/features/steps/common/" + newName), context);
		}, this);

		//copy support files
		["_hooks.js", "_world.js"].forEach(function (templatePath) {
			var newName = templatePath.replace("_", "");
			_this.fs.copyTpl(_this.templatePath("es6/features/support/" + templatePath), _this.destinationPath("es6/features/support/" + newName), context);
		}, this);

		//copy controllers
		["_applicationController.js"].forEach(function (templatePath) {
			var newName = templatePath.replace("_model", "" + context.name).replace("_", "");
			_this.fs.copyTpl(_this.templatePath("es6/app/controllers/" + templatePath), _this.destinationPath("es6/app/controllers/" + newName), context);
		}, this);

		//copy managers
		["_accountManager.js"].forEach(function (templatePath) {
			var newName = templatePath.replace("_model", "" + context.name).replace("_", "");
			_this.fs.copyTpl(_this.templatePath("es6/app/managers/" + templatePath), _this.destinationPath("es6/app/managers/" + newName), context);
		}, this);

		//copy misc
		["_errors.js", "_server.js"].forEach(function (templatePath) {
			var newName = templatePath.replace("_", "");
			_this.fs.copyTpl(_this.templatePath("es6/app/" + templatePath), _this.destinationPath("es6/app/" + newName), context);
		}, this);
	},

	install: function yoInstall() {
		this.installDependencies({
			skipInstall: true
		});
	}
});