var yeoman = require("yeoman-generator");

import inflect from "jargon";

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
			default: "myModel"
		}];

		this.prompt(prompts, function (props) {
			this.props = props;

			done();
		}.bind(this));
	},

	writing: function yoWriting() {
		const context = {
			name: this.props.name,
			Name: inflect(this.props.name).pascal.toString(),
			names: inflect(this.props.name).plural.toString(),
			_name: inflect(this.props.name).snake.toString()
		};

		//copy features
		["_model.show.feature",
		"_model.create.feature",
		"_model.update.feature",
		"_model.delete.feature",
		"_model.list.feature"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("_model", `${context.name}`);
			this.fs.copyTpl(
				this.templatePath("features/" + templatePath),
				this.destinationPath(`features/${context.name}/${newName}`),
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
