import Model from "dovima";
import Database from "almaden";
import jsonApiModelFormatter from "jsonapi-model-formatter";
import Action from "staircase";
import ActionContext from "../../actionContext.js";
import authenticate from "../../steps/authenticate.js";
import authorize from "../../steps/authorize.js";
import fetch<%= modelNamePluralPascal %> from "../../steps/<%= modelNamePlural %>/fetch<%= modelNamePluralPascal %>.js";
import save<%= modelNamePluralPascal %> from "../../steps/<%= modelNamePlural %>/save<%= modelNamePluralPascal %>.js";
import <%= modelNamePascal %> from "../../models/<%= modelName %>.js";
import { local } from "../../../../environment.json";
import { getBadRequestError } from "../../errors.js";

Model.database = new Database(local);

export default class <%= modelNamePluralPascal %>Update {
	constructor(input, context) {
		this.database = Model.database;
		this.actionContext = new ActionContext(input, context);
		this.actionContext.permission = "<%= modelNamePlural %>:update";
		this.actionContext.<%= modelName %>Id = input.params.path.id;

		if(input.data.data) {
			this.actionContext.<%= modelName %>Parameters = jsonApiModelFormatter(input.data.data, <%= modelNamePascal %>);
			this.action = new Action(this.actionContext);
			this.action.series(
					authenticate,
					authorize,
					fetch<%= modelNamePluralPascal %>,
					save<%= modelNamePluralPascal %>
				);
		}
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
		if(this.action) {
			this.action
				.results((errors) => {
					if (errors) {
						context.done(errors);
					} else {
						context.done(null, { data: jsonApiModelFormatter(this.actionContext.<%= modelName %>) });
					}
				});
		} else {
			context.done(getBadRequestError());
		}
	}
}
