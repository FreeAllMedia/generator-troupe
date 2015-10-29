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

		//copy controllers
		["_modelController.js"].forEach(function (templatePath) {
			var newName = templatePath.replace("_model", "" + context.name).replace("_", "");
			_this.fs.copyTpl(_this.templatePath("es6/app/controllers/" + templatePath), _this.destinationPath("es6/app/controllers/" + newName), context);
		}, this);

		//copy model
		this.fs.copyTpl(this.templatePath("es6/app/models/_model.js"), this.destinationPath("es6/app/models/" + context.name + ".js"), context);

		//copy model spec
		this.fs.copyTpl(this.templatePath("es6/spec/_model.spec.js"), this.destinationPath("es6/spec/models/" + context.name + ".spec.js"), context);

		//copy routers
		["_modelRouter.js", "_modelRoutes.js"].forEach(function (templatePath) {
			var newName = templatePath.replace("_model", "" + context.name).replace("_", "");
			_this.fs.copyTpl(_this.templatePath("es6/app/routers/" + templatePath), _this.destinationPath("es6/app/routers/" + newName), context);
		}, this);
	},

	install: function yoInstall() {
		this.installDependencies({
			skipInstall: true
		});
	}
});