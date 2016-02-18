import Model from "dovima";
import chai from "chai";
import Action from "staircase";
import jsonApiModelFormatter from "jsonapi-model-formatter";
import { jsonWebToken } from "hacher";
chai.should();

import <%= modelNamePascal %> from "../../../dist/lib/models/<%= modelName %>.js";
import AccessToken from "../../../dist/lib/models/accessToken.js";
import <%= modelNamePluralPascal %>Delete from "../../../dist/lib/lambdas/<%= modelNamePlural %>/<%= modelNamePlural %>Delete.js";
import authenticate from "../../../dist/lib/steps/authenticate.js";
import authorize from "../../../dist/lib/steps/authorize.js";
import fetch<%= modelNamePascal %> from "../../../dist/lib/steps/<%= modelNamePlural %>/fetch<%= modelNamePluralPascal %>.js";
import delete<%= modelNamePascal %> from "../../../dist/lib/steps/<%= modelNamePlural %>/delete<%= modelNamePluralPascal %>.js";

describe("lambdas/<%= modelName %>.delete.js", () => {
	let input;
	let handlerClass;
	let context;
	let callback;
	let validAccessTokenParam;
	let salt;

	beforeEach(() => {
		salt = "testSalt";
		// This makes it more convenient to test the promise callback
		context = {
			done: (error, responseData) => {
				callback(error, responseData);
			}
		};

		// Note that this is the format that the lambda body will take
		validAccessTokenParam = {
			header: {
				"accessToken": jsonWebToken.sign({ id: 1 }, salt, {})
			},
			path: {
				id: 1
			}
		};

		input = {
			"data": {},
			"params": validAccessTokenParam
		};

		handlerClass = new <%= modelNamePluralPascal %>Delete(input, context);
	});

	it("should have the database set", () => {
		handlerClass.database.should.eql(Model.database);
	});

	describe("(permission)", () => {
		it("should set the permission needed", () => {
			handlerClass.actionContext.permission.should.equal("<%= modelNamePlural %>:delete");
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
			handlerClass.action.steps[0].steps[2].should.eql(fetch<%= modelNamePascal %>);
		});

		it("should add the saveApiKey step", () => {
			handlerClass.action.steps[0].steps[3].should.eql(delete<%= modelNamePascal %>);
		});
	});

	describe("(parameters)", () => {
		it("should set an <%= modelName %> id", () => {
			handlerClass.actionContext.<%= modelName %>Id.should.equal(1);
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
				handlerClass.action = new Action(handlerClass.actionContext);
				handlerClass.action.series((actionContext, next) => {
					actionContext.<%= modelName %> = result;
					next();
				});

				expectedResponse = {
					data: jsonApiModelFormatter(result)
				}
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
