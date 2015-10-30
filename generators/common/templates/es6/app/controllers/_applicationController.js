/**
 * Component Dependencies
 */
import Controller from "forbin";
import {isAssigned} from "proven";
import jsonApiModelFormatter from "jsonapi-model-formatter";
import appeal from "appeal";
import packageJson from "../../../package.json";

/**
 * Error Dependencies
 */
import {
	BadRequestError,
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

/**
 * # ApplicationController
 *
 * Master Controller pattern with ability to set application-wide prefilters.
 *
 * @class ApplicationController
 */
export default class ApplicationController extends Controller {

	toJSON(models) {
		return jsonApiModelFormatter(models);
	}

	/**
	 * Filters to run before every controller action
	 */
	prefilters() {
	}

	//TODO: tech debt, fix forbin bind filter issue and make a private check permission method to check a role
	checkPermission(request, permissionTarget) {
		let resultPermission = request.account.permissions.find(
			(permission) => {
				return permission === permissionTarget;
			});

		return (resultPermission !== undefined);
	}

	//this filter is just for admin purposes
	isAdmin(request, response, next) {
		if(this.checkPermission(request, "admin")) {
			next(); //is admin
		} else {
			response.unauthorized(new InsufficientPermissionsError());
		}
	}

	//this is executed by default everytime
	isOwnerOrAdmin (request, response, next) {
		if(request.accountId === request.account.id) { //this is probably redundant
			next(); //is owner
		} else if(this.checkPermission(request, "admin")) {
			next(); //is admin
		} else {
			response.unauthorized(new InsufficientPermissionsError());
		}
	}

	fillToken(accessToken, callback) {
		//HACK: sometime, this will be part of the account-client-sdk
		//call account-service to retrieve account and permissions
		getAccountByAccessToken(accessToken, callback);
	}

	validateAccessToken(request, response, next) {
		if(!(isAssigned.call({hash: request.header("Access-Token")}, "hash").result)) {
			response.badRequest(new BadRequestError());
		} else {
			this.fillToken(request.header("Access-Token"),
				(error, tokenAccount) => {
					if(error) {
						request.account = tokenAccount;
						response.unauthorized(error);
					} else {
						request.account = tokenAccount;
						//this is a must permission (owner or admin) for every token
						this.isOwnerOrAdmin(request, response, next);
					}
				}
			);
		}
	}

	validateId (request, response, next) {
		if(request.params.id > 0) {
			next();
		} else {
			let error = new BadRequestError();
			response.badRequest(error);
		}
	}

	validateData (request, response, next) {
		if(isAssigned.call(request.body, "data").result) {
			next();
		} else {
			let error = new BadRequestError();
			response.badRequest(error);
		}
	}
}
