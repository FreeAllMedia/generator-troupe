import Model from "dovima";
import chai from "chai";
import Action from "staircase";
import jsonApiModelFormatter from "jsonapi-model-formatter";
chai.should();

import <%= modelNamePascal %> from "../../../dist/lib/models/<%= modelName %>.js";
import <%= modelNamePluralPascal %>Update from "../../../dist/lib/lambdas/<%= modelNamePlural %>/<%= modelNamePlural %>Update.js";
import authenticate from "../../../dist/lib/steps/authenticate.js";
import authorize from "../../../dist/lib/steps/authorize.js";
import fetch<%= modelNamePascal %> from "../../../dist/lib/steps/<%= modelNamePlural %>/fetch<%= modelNamePluralPascal %>.js";
import save<%= modelNamePascal %> from "../../../dist/lib/steps/<%= modelNamePlural %>/save<%= modelNamePluralPascal %>.js";
import check<%= modelNamePascal %>Ownership from "../../../dist/lib/steps/<%= modelNamePlural %>/check<%= modelNamePascal %>Ownership.js";
import { jsonWebToken } from "hacher";

describe("lambdas/<%= modelName %>Update.js", () => {
	let input;
	let handlerClass;
	let callback;
	let context;
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
			},
			path: {
				id: 1
			}
		};

		input = {
			"data": { "data": { "type": "<%= modelNamePlural %>", "attributes": { "name": "test <%= modelName %>" } } },
			"params": validAccessTokenParam
		};

		handlerClass = new <%= modelNamePluralPascal %>Update(input, context);
	});

	it("should have the database set", () => {
		handlerClass.database.should.eql(Model.database);
	});

	it("should return an error if the input is not ok", done => {
		callback = (handlerError) => {
			handlerError.message.should.contain("BADREQUEST");
			done();
		};
		delete input.data.data;
		const <%= modelName %> = new <%= modelNamePluralPascal %>Update(input, context);
		<%= modelName %>.handler(input, context);
	});

	describe("(permission)", () => {
		it("should set the permission needed", () => {
			handlerClass.actionContext.permission.should.equal("<%= modelNamePlural %>:update");
		});
	});

	describe("(action steps)", () => {
		it("should add the authenticate step", () => {
			handlerClass.action.steps[0].steps[0].should.eql(authenticate);
		});

		it("should add the authorize step", () => {
			handlerClass.action.steps[0].steps[1].should.eql(authorize);
		});

		it("should add the fetch <%= modelName %> step", () => {
			handlerClass.action.steps[0].steps[2].should.eql(fetch<%= modelNamePascal %>);
		});

		it("should add the fetch <%= modelNamePascal %> step", () => {
			handlerClass.action.steps[0].steps[3].should.eql(check<%= modelNamePascal %>Ownership);
		});

		it("should add the save <%= modelName %> step", () => {
			handlerClass.action.steps[0].steps[4].should.eql(save<%= modelNamePascal %>);
		});
	});

	describe("(parameters)", () => {
		it("should set the parameters for the save <%= modelName %> to use", () => {
			handlerClass.actionContext.<%= modelName %>Parameters.should.eql(new <%= modelNamePascal %>({ "name": "test <%= modelName %>" }));
		});

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
