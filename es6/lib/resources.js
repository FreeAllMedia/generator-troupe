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
			modelNamePlural: jargon(this.props.modelName).plural.toString()
		};

		//copy resources
		["modelsResources.js"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("models", `${context.modelNamePlural}`);
			this.fs.copyTpl(
				this.templatePath(`source/lib/api/models/${templatePath}`),
				this.destinationPath(`source/lib/api/${context.modelNamePlural}/${newName}`),
				context
			);
		});

		//copy resources spec
		["modelsResources.spec.js"]
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
