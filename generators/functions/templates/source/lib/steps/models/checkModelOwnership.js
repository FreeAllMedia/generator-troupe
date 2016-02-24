import { getInsufficientPermissionsError } from "../../errors.js";

export default function check<%= modelNamePascal %>Ownership(actionContext, next) {
	if (actionContext.isAdmin ||
		(actionContext.<%= modelName %> && actionContext.accountId === actionContext.<%= modelName %>.accountId)) {
		next();
	} else {
		next(getInsufficientPermissionsError());
	}
}
