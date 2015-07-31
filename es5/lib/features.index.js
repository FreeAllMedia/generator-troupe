"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _jargon = require("jargon");

var _jargon2 = _interopRequireDefault(_jargon);

var yeoman = require("yeoman-generator");

module.exports = yeoman.generators.Base.extend({
	initializing: function yoInitializing() {
		this.pkg = require("../../package.json");
	},

	prompting: function yoPrompt() {
		var done = this.async();

		var prompts = [{
			type: "input",
			name: "name",
			message: "What is the model name? (use camel case please)",
			"default": "myModel"
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
			_name: (0, _jargon2["default"])(this.props.name).snake.toString()
		};

		//copy features
		["_model.show.feature", "_model.create.feature", "_model.update.feature", "_model.delete.feature", "_model.list.feature"].forEach(function (templatePath) {
			var newName = templatePath.replace("_model", "" + context.name);
			_this.fs.copyTpl(_this.templatePath("features/" + templatePath), _this.destinationPath("features/" + context.name + "/" + newName), context);
		}, this);
	},

	install: function yoInstall() {
		this.installDependencies({
			skipInstall: true
		});
	}
});