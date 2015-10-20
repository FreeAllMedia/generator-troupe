import appeal from "appeal";
import packageJson from "../../../package.json";
import {
	InsufficientPermissionsError,
	ExpiredAccessTokenError,
	InvalidAccessTokenError
} from "../errors.js";

function takeAccountInformationFromBody(getAccountResponse) {
	let responseData = getAccountResponse.body.data;
	let account;
	if(responseData && responseData.attributes) {
		account = {
			id: responseData.id,
			permissions: responseData.attributes.permissions
		};
	}
	return account;
}

function callAccountService(url, accessToken, callback) {
	appeal
		.get
		.url(url)
		.header("Access-Token", accessToken)
		.header("Content-Type", "application/vnd.api+json; charset=utf-8")
		.results((error, getAccountResponse) => {
			if(error) {
				callback(error);
			} else if(getAccountResponse.status < 300) {
				callback(null, takeAccountInformationFromBody(getAccountResponse));
			} else if(getAccountResponse.status === 401 //HACK: see how to improve this decision to be cleaner
				&& getAccountResponse.body
				&& getAccountResponse.body.errors
				&& getAccountResponse.body.errors[0].title.indexOf("Expired") >= 0) {
				callback(new ExpiredAccessTokenError());
			} else if(getAccountResponse.status === 404 //HACK: see how to improve this decision to be cleaner
				&& getAccountResponse.body
				&& getAccountResponse.body.errors
				&& getAccountResponse.body.errors[0].title.indexOf("Invalid") >= 0) {
				callback(new InvalidAccessTokenError());
			} else {
				//HACK: maybe improve this with logging, because it will be oftenly masked to clients
				//const message = `ERROR ON ${url}: Http Status ${getAccountResponse.status}`;
				callback(new InsufficientPermissionsError());
			}
		});
}

export function getAccountByAccessToken(accessToken, callback) {
	const url = `${packageJson.service.account}/accessToken/account`;
	callAccountService(url, accessToken, callback);
}

export function getAccountById(accountId, accessToken, callback) {
	const url = `${packageJson.service.account}/account/${accountId}`;
	callAccountService(url, accessToken, callback);
}
