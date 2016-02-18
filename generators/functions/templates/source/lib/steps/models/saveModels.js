import Account from "../../models/account.js";

export default function save<%= modelNamePluralPascal %>(actionContext, next) {
	let accountParameters;
	if(actionContext.accountParameters) {
		accountParameters = actionContext.accountParameters;
	}
	actionContext.account = new Account(accountParameters);
	if(actionContext.accountId) {
		actionContext.account.id = actionContext.accountId;
	}

	actionContext.account.save((saveAccountError) => {
		next(saveAccountError);
	});
}
