/* eslint-disable new-cap */
const <%= name %>Fixtures = require("../../../spec/fixtures/<%= name %>s.json");

export default function <%= Name %>ControllerCommonSteps () {
	this.Given(/^<%= name %> is found$/, function given<%= Name %>IsFound(callback) {
		this.<%= name %>Id = 1;
		callback();
	});

	this.Given(/^<%= name %> is not found$/, function given<%= Name %>IsNotFound(callback) {
		this.<%= name %>Id = 2;
		callback();
	});

	this.Given(/^<%= name %> parameters are valid$/, function given<%= Name %>ParamtersValid(callback) {
		this.<%= name %> = <%= name %>Fixtures[0];
		callback();
	});

	this.Given(/^<%= name %> parameters are invalid$/, function given<%= Name %>ParametersInvalid(callback) {
		this.<%= name %> = <%= name %>Fixtures[1];
		callback();
	});
}
