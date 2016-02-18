import Model from "dovima";
import chai from "chai";
import Action from "staircase";
import jsonApiModelFormatter from "jsonapi-model-formatter";
chai.should();

import <%= modelNamePascal %> from "../../../dist/lib/models/<%= modelName %>.js";
import AccessToken from "../../../dist/lib/models/accessToken.js";
import <%= modelNamePluralPascal %>Create from "../../../dist/lib/lambdas/<%= modelNamePlural %>/<%= modelNamePlural %>Create.js";
import authenticate from "../../../dist/lib/steps/authenticate.js";
import authorize from "../../../dist/lib/steps/authorize.js";
import save<%= modelNamePascal %> from "../../../dist/lib/steps/<%= modelNamePlural %>/save<%= modelNamePascal %>.js";
import saveApiKey from "../../../dist/lib/steps/apiKeys/saveApiKey.js";
import { jsonWebToken } from "hacher";

describe("lambdas/<%= modelName %>Create.js", () => {
	let input;
	let handlerClass;
	let context;
	let callback;
	let validAccessTokenParam;
	let salt;

	beforeEach(() => {
		salt = "testSalt";
		context = {
			done: (error, responseData) => {
				callback(error, responseData);
			}
		};

		// Note that this is the format that the lambda body will take
		validAccessTokenParam = {
			header: {
				"accessToken": jsonWebToken.sign({ id: 1 }, salt, {})
			}
		};

		input = {
			params: validAccessTokenParam,
			"data": { "name": "test <%= modelName %>" }
		};

		handlerClass = new <%= modelNamePascal %>Create(input, context);
	});

	it("should have the database set", () => {
		handlerClass.database.should.eql(Model.database);
	});

	describe("(permission)", () => {
		it("should set the permission needed", () => {
			handlerClass.actionContext.permission.should.equal("<%= modelName %>:create");
		});
	});

	describe("(action steps)", () => {
		it("should add the authenticate step", () => {
			handlerClass.action.steps[0].steps[0].should.eql(authenticate);
		});

		it("should add the authorize step", () => {
			handlerClass.action.steps[0].steps[1].should.eql(authorize);
		});

		it("should add the create <%= modelName %> step", () => {
			handlerClass.action.steps[0].steps[2].should.eql(save<%= modelNamePascal %>);
		});

		it("should add the saveApiKey step", () => {
			handlerClass.action.steps[0].steps[3].should.eql(saveApiKey);
		});
	});

	describe("(parameters)", () => {
		it("should set the parameters for the save <%= modelName %> to use", () => {
			handlerClass.actionContext.<%= modelName %>Parameters.should.eql({ "name": "test <%= modelName %>" });
		});

		it("should not set an <%= modelName %> id", () => {
			handlerClass.actionContext.should.not.have.property("<%= modelName %>Id");
		});
	});

	describe("(step scenarios)", () => {
		describe("(when a step throws an error)", () => {
			let error;

			beforeEach(() => {
				error = new Error("an error");
				handlerClass.action = new Action({});
				handlerClass.action.series((actionContext, next) => {
					next(error);
				});
			});

			it("should throw the error to the context correctly", done => {
				callback = (handlerError) => {
					handlerError.should.eql(error);
					done();
				};

				handlerClass.handler(input, context);
			});
		});

		describe("(when the steps are executed correctly)", () => {
			let result;
			let accessToken;
			let expectedResponse;

			beforeEach(() => {
				result = new <%= modelNamePascal %>({ name: "an<%= modelName %>" });
				accessToken = new AccessToken();
				handlerClass.action = new Action(handlerClass.actionContext);
				handlerClass.action.series((actionContext, next) => {
					actionContext.<%= modelName %> = result;
					actionContext.accessToken = accessToken;
					next();
				});

				result.accessTokens.push(accessToken);

				expectedResponse = {
					data: jsonApiModelFormatter(result),
					included: [jsonApiModelFormatter(accessToken)]
				};
			});

			it("should return the results as expected", done => {
				callback = (handlerError, handlerResult) => {
					handlerResult.should.eql(expectedResponse);
					done();
				};

				handlerClass.handler(input, context);
			});
		});
	});
});
