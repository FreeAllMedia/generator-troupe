import { getBadRequestError } from "../../errors.js";

export default function delete<%= modelNamePluralPascal %>(actionContext, next) {
	if (actionContext && actionContext.account) {
		actionContext.account.softDelete((deleteError) => {
			next(deleteError);
		});
	} else {
		next(getBadRequestError());
	}
}
