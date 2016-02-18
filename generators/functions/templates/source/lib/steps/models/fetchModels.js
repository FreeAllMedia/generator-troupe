import <%= modelNamePascal %> from "../../models/<%= modelName %>.js";
import { getNotFoundError,
	getInternalError,
	getBadRequestError } from "../../errors.js";

export default function fetch<%= modelNamePluralPascal %>(actionContext, next) {
	let <%= modelName %>Id;
	if (actionContext && actionContext.<%= modelName %>Id) {
		<%= modelName %>Id = actionContext.<%= modelName %>Id;
	}
	if(<%= modelName %>Id) {
		<%= modelNamePascal %>.find
			.one
			.where("id", <%= modelName %>Id)
			.results((findError, result) => {
				if(findError) {
					next(getInternalError());
				} else if (!result || !result.id) {
					next(getNotFoundError());
				} else {
					actionContext.<%= modelName %> = result;
					next();
				}
			});
	} else {
		next(getBadRequestError());
	}
}
