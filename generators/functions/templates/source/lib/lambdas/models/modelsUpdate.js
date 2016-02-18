import Model from "dovima";
import Database from "almaden";
import jsonApiModelFormatter from "jsonapi-model-formatter";
import Action from "staircase";
import ActionContext from "../../actionContext.js";
import authenticate from "../../steps/authenticate.js";
import authorize from "../../steps/authorize.js";
import fetch<%= modelNamePluralPascal %> from "../../steps/<%= modelNamePlural %>/fetch<%= modelNamePluralPascal %>.js";
import save<%= modelNamePluralPascal %> from "../../steps/<%= modelNamePlural %>/save<%= modelNamePluralPascal %>.js";
import { local } from "../../../../environment.json";

Model.database = new Database(local);

export default class <%= modelNamePluralPascal %>Update {
	constructor(input, context) {
		this.database = Model.database;
		this.actionContext = new ActionContext(input, context);
		this.actionContext.permission = "<%= modelNamePlural %>:update";
		this.actionContext.<%= modelName %>Id = input.params.path.id;
		this.actionContext.<%= modelName %>Parameters = input.data;
		this.action = new Action(this.actionContext);
		this.action.series(
				authenticate,
				authorize,
				fetch<%= modelNamePluralPascal %>,
				save<%= modelNamePluralPascal %>
			);
	}

	/**
	 * Handle a update <%= modelName %> request
	 *
	 * @method	<%= modelName %>Create
	 * @param		{Object}				 	input		 JSON data sent in with the request
	 * @param		{LambdaContext}		context		 					 The AWS Lambda context
	 * @return 	{undefined}														 Returns nothing
	 */
	handler(input, context) {
		this.action
			.results((errors) => {
				if (errors) {
					context.done(errors);
				} else {
					context.done(null, { data: jsonApiModelFormatter(this.actionContext.<%= modelName %>) });
				}
			});
	}
}
