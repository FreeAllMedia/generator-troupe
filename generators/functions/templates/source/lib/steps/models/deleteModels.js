import { getBadRequestError } from "../../errors.js";

export default function delete<%= modelNamePluralPascal %>(actionContext, next) {
	if (actionContext && actionContext.<%= modelName %>) {
		actionContext.<%= modelName %>.softDelete((deleteError) => {
			next(deleteError);
		});
	} else {
		next(getBadRequestError());
	}
}
