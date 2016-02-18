import Model from "dovima";
import Database from "almaden";
import jsonApiModelFormatter from "jsonapi-model-formatter";
import Action from "staircase";
import ActionContext from "../../actionContext.js";
import authenticate from "../../steps/authenticate.js";
import authorize from "../../steps/authorize.js";
import list<%= modelNamePluralPascal %> from "../../steps/<%= modelNamePlural %>/list<%= modelNamePluralPascal %>.js";
import { local } from "../../../../environment.json";

Model.database = new Database(local);

export default class <%= modelNamePluralPascal %>List {
	constructor(input, context) {
		this.database = Model.database;
		this.actionContext = new ActionContext(input, context);
		this.actionContext.permission = "<%= modelName %>:list";
		this.actionContext.<%= modelName %>Id = input.params.path.id;
		this.action = new Action(this.actionContext);
		this.action.series(
				authenticate,
				authorize,
				list<%= modelNamePluralPascal %>
			);
	}

	/**
	 * Handle a create <%= modelName %> request
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
					context.done(null, { data: jsonApiModelFormatter(this.actionContext.<%= modelNamePlural %>) });
				}
			});
	}
}
