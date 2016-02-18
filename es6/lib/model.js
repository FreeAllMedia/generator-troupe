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
			modelNamePascal: jargon(this.props.modelName).pascal.toString()
		};

		//copy functions
		this.fs.copyTpl(
			this.templatePath(`source/lib/models/model.js`),
			this.destinationPath(`source/lib/${context.modelName}s/${context.modelName}.js`),
			context
		);
	}
});
