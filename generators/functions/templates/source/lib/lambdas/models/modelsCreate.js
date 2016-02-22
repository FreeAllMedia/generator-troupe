import Model from "dovima";
import Database from "almaden";
import jsonApiModelFormatter from "jsonapi-model-formatter";
import Action from "staircase";
import ActionContext from "../../actionContext.js";
import authenticate from "../../steps/authenticate.js";
import authorize from "../../steps/authorize.js";
import save<%= modelNamePluralPascal %> from "../../steps/<%= modelNamePlural %>/save<%= modelNamePluralPascal %>.js";
import <%= modelNamePascal %> from "../../models/<%= modelName %>.js";
import { local } from "../../../../environment.json";
import { getBadRequestError } from "../../errors.js";

Model.database = new Database(local);

export default class <%= modelNamePluralPascal %>Create {
	constructor(input, context) {
		this.database = Model.database;
		this.actionContext = new ActionContext(input, context);
		this.actionContext.permission = "<%= modelNamePlural %>:create";

		if(input.data.data) {
			this.actionContext.<%= modelName %>Parameters = jsonApiModelFormatter(input.data.data, <%= modelNamePascal %>);
			delete this.actionContext.<%= modelName %>Parameters.id;
			this.action = new Action(this.actionContext);
			this.action.series(
					authenticate,
					authorize,
					save<%= modelNamePluralPascal %>
				);
		}
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
		if(this.action) {
			this.action
				.results((errors) => {
					if (errors) {
						context.done(errors);
					} else {
						const data = jsonApiModelFormatter(this.actionContext.<%= modelName %>);
						context.done(null, { data });
					}
				});
		} else {
			context.done(getBadRequestError());
		}
	}
}
