import Account from "../../models/account.js";

export default function list<%= modelNamePluralPascal %>(actionContext, next) {
	Account.find
		.all
		.results((findAccountError, result<%= modelNamePluralPascal %>) => {
			if(findAccountError) {
				next(findAccountError);
			} else {
				actionContext.<%= modelNamePlural %> = result<%= modelNamePluralPascal %>;
				next();
			}
		});
}
