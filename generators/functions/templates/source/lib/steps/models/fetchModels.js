import Account from "../../models/account.js";
import { getNotFoundError,
	getInternalError,
	getBadRequestError } from "../../errors.js";

export default function fetch<%= modelNamePluralPascal %>(actionContext, next) {
	let accountId;
	if (actionContext && actionContext.accountId) {
		accountId = actionContext.accountId;
	} else if (actionContext.apiKey && actionContext.apiKey.accountId) {
		accountId = actionContext.apiKey.accountId;
	}
	if(accountId) {
		Account.find
			.one
			.where("id", accountId)
			.results((findAccountError, resultAccount) => {
				if(findAccountError) {
					next(getInternalError());
				} else if (!resultAccount || !resultAccount.id) {
					next(getNotFoundError());
				} else {
					actionContext.account = resultAccount;
					next();
				}
			});
	} else {
		next(getBadRequestError());
	}
}
