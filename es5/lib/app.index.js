"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _jargon = require("jargon");

var _jargon2 = _interopRequireDefault(_jargon);

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

		var prompts = [{
			type: "input",
			name: "name",
			message: "What is the model name? (use camel case please)",
			"default": "myModel"
		}, {
			type: "input",
			name: "attributeString",
			message: "Provide the model attributes sepparated by a comma? (like name,link,email,contactPhone)",
			"default": "name"
		}];

		this.prompt(prompts, (function (props) {
			this.props = props;
			done();
		}).bind(this));
	},

	writing: function yoWriting() {
		var _this = this;

		var context = {
			name: this.props.name,
			Name: (0, _jargon2["default"])(this.props.name).pascal.toString(),
			names: (0, _jargon2["default"])(this.props.name).plural.toString(),
			_name: (0, _jargon2["default"])(this.props.name).snake.toString(),
			attributes: this.props.attributes,
			attributeString: this.props.attributeString
		};

		context.attributes = context.attributeString.split(",");

		//filling a strings that are going to be used in the templates to mock a test entity
		context.attributesWithValues = "";
		context.fieldsWithValues = "";
		context.validateString = "";
		context.attributes.forEach(function (attributeName, index) {
			if (index > 0) {
				var breakLine = ",\n";
				context.attributesWithValues += breakLine;
				context.fieldsWithValues += breakLine;
				context.validateString += breakLine;
			}
			var snakeAttributeName = (0, _jargon2["default"])(attributeName).snake.toString();
			context.attributesWithValues += "\"" + attributeName + "\": \"test " + attributeName + "\"";
			context.fieldsWithValues += "\"" + snakeAttributeName + "\": " + context.name + "." + attributeName;
			context.validateString += "this.ensure(\"" + attributeName + "\", isNotEmpty);";
		});
		context.attributesJson = JSON.stringify(context.attributesWithValues);

		//copy feature steps
		["_model.show.steps.js", "_model.create.steps.js", "_model.update.steps.js", "_model.delete.steps.js", "_model.list.steps.js"].forEach(function (templatePath) {
			var newName = templatePath.replace("_model", "" + context.name);
			_this.fs.copyTpl(_this.templatePath("es6/features/steps/" + templatePath), _this.destinationPath("es6/features/steps/" + context.name + "/" + newName), context);
		}, this);

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
		["_modelController.js", "_applicationController.js"].forEach(function (templatePath) {
			var newName = templatePath.replace("_model", "" + context.name).replace("_", "");
			_this.fs.copyTpl(_this.templatePath("es6/app/controllers/" + templatePath), _this.destinationPath("es6/app/controllers/" + newName), context);
		}, this);

		//copy managers
		["_accountManager.js", "_modelManager.js"].forEach(function (templatePath) {
			var newName = templatePath.replace("_model", "" + context.name).replace("_", "");
			_this.fs.copyTpl(_this.templatePath("es6/app/managers/" + templatePath), _this.destinationPath("es6/app/managers/" + newName), context);
		}, this);

		//copy model
		this.fs.copyTpl(this.templatePath("es6/app/models/_model.js"), this.destinationPath("es6/app/models/" + context.name + ".js"), context);

		//copy model spec
		this.fs.copyTpl(this.templatePath("es6/spec/_model.spec.js"), this.destinationPath("es6/spec/" + context.name + ".spec.js"), context);

		//copy routers
		["_modelRouter.js", "_modelRoutes.js"].forEach(function (templatePath) {
			var newName = templatePath.replace("_model", "" + context.name).replace("_", "");
			_this.fs.copyTpl(_this.templatePath("es6/app/routers/" + templatePath), _this.destinationPath("es6/app/routers/" + newName), context);
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