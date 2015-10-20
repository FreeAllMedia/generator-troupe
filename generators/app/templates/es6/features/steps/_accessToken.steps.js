/* eslint-disable new-cap */
import {mockEndpoint} from "./common/request.js";
import {encrypt} from "./common/jsonWebToken.js";
import packageJson from "../../../package.json";
import ApplicationController from "../../app/controllers/applicationController.js";
import {makeRequest} from "./common/request.js";
import Router from "omnirouter";
import JsonApiFormatter from "jsonapi-formatter";

const fillAccountId = Symbol("fillAccountId");

class ConcreteController extends ApplicationController {
	initialize() {
		this.before([this.securedMethod, this.adminMethod], this[fillAccountId]);
		this.before([this.securedMethod, this.adminMethod], this.validateAccessToken);
		this.before(this.adminMethod, this.isAdmin);
	}

	[fillAccountId](request, response, next) {
		request.accountId = 1;
		next();
	}

	securedMethod(request, response) {
		response.ok();
	}

	adminMethod(request, response) {
		response.ok();
	}
}

class ConcreteRouter extends Router {
	initialize() {
		let concreteController = new ConcreteController();
		this.get("/securedMethod")
			.then((request, response) => {
				concreteController.securedMethod(request, response);
			});
		this.get("/adminMethod")
			.then((request, response) => {
				concreteController.adminMethod(request, response);
			});
	}
}

const account = {
	"id": 1,
	"permissions": []
};

const validUserAccountEndpoint = {
	"baseUrl": packageJson.service.account,
	"path": "/accessToken/account",
	"method": "get",
	"status": 200,
	"response": {
		"data": {
			"id": 1,
			"type": "Account",
			"attributes": {
				"permissions": []
			}
		}
	}
};

const validAdminAccountEndpoint = {
	"baseUrl": packageJson.service.account,
	"path": "/accessToken/account",
	"method": "get",
	"status": 200,
	"response": {
		"data": {
			"id": 100,
			"type": "Account",
			"attributes": {
				"permissions": ["admin"]
			}
		}
	}
};

const expiredUserAccountEndpoint = {
	"baseUrl": packageJson.service.account,
	"path": "/accessToken/account",
	"method": "get",
	"status": 401,
	"response": {
		"errors": [{
			"title": "Expired Access-Token",
			"detail": "The access token provided is expired."
		}]
	}
};

const invalidUserAccountEndpoint = {
	"baseUrl": packageJson.service.account,
	"path": "/accessToken/account",
	"method": "get",
	"status": 404,
	"response": {
		"errors": [{
			"title": "Invalid Access-Token",
			"detail": "The access token provided is invalid."
		}]
	}
};

const unauthorizedUserAccountEndpoint = {
	"baseUrl": packageJson.service.account,
	"path": "/accessToken/account",
	"method": "get",
	"status": 404,
	"response": {
		"errors": [{
			"title": "Insufficient Permissions",
			"detail": "You don't have permissions."
		}]
	}
};

export default function SecuritySteps () {

	this.When(/^the controller filter is executed$/, function (callback) {
		const router = new ConcreteRouter();
		const portNumber = 1339;
		router.use(JsonApiFormatter);
		this.url = `http:\/\/localhost:${portNumber}`;

		router.listen(portNumber, () => {
			//make request
			makeRequest.call(this, "/securedMethod", "get",
				() => {
					router.close(() => {
						callback();
					});
				});
		});
	});

	this.When(/^the controller admin filter is executed$/, function (callback) {
		const router = new ConcreteRouter();
		const portNumber = 1339;
		router.use(JsonApiFormatter);
		this.url = `http:\/\/localhost:${portNumber}`;

		router.listen(portNumber, () => {
			//make request
			makeRequest.call(this, "/adminMethod", "get",
				() => {
					router.close(() => {
						callback();
					});
				});
		});
	});

	this.Given(/^a valid token$/, function (callback) {
		//mock endpoint with it
		mockEndpoint.call(this, validUserAccountEndpoint);
		//encrypt jwt
		//add the token to the headers
		this.headers["Access-Token"] = encrypt.call(this, account);
		callback();
	});

	this.Given(/^a valid admin token$/, function (callback) {
		//mock endpoint with it
		mockEndpoint.call(this, validAdminAccountEndpoint);
		//encrypt jwt
		//add the token to the headers
		this.headers["Access-Token"] = encrypt.call(this, account);
		callback();
	});


	this.Given(/^an unauthorized token$/, function (callback) {
		//mock endpoint with it
		mockEndpoint.call(this, unauthorizedUserAccountEndpoint);
		//encrypt jwt
		//add the token to the headers
		this.headers["Access-Token"] = encrypt.call(this, account);
		callback();
	});

	this.Given(/^an invalid token$/, function (callback) {
		//mock endpoint with it
		mockEndpoint.call(this, invalidUserAccountEndpoint);
		//encrypt jwt
		//add the token to the headers
		this.headers["Access-Token"] = "someinvalidtoken";
		callback();
	});

	this.Given(/^an expired token$/, function (callback) {
		//mock endpoint with it
		mockEndpoint.call(this, expiredUserAccountEndpoint);
		//encrypt jwt
		//add the token to the headers
		this.headers["Access-Token"] = encrypt.call(this, account);
		callback();
	});
}
