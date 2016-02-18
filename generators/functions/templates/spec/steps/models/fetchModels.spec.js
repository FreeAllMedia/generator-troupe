import fetch<%= modelNamePluralPascal %> from "../../../dist/lib/steps/<%= modelNamePlural %>/fetch<%= modelNamePluralPascal %>.js";
import Model from "dovima";
import Database from "almaden";
import chai from "chai";

describe("steps/fetch<%= modelNamePluralPascal %>.js", () => {
	let actionContext;
	let database;
	let tomorrow;
	let yesterday;
	let should;

	before(() => {
		should = chai.should();
	});

	beforeEach(() => {
		database = Model.database = new Database({
			"client": "mysql",
			"debug": true
		});

		actionContext = { <%= modelName %>Id: 1 };
	});

	describe("(when is valid)", () => {

		let mockQuerySelectApiKey;

		beforeEach(() => {
			mockQuerySelectApiKey = database.mock
				.select("*")
				.from("<%= modelTableName %>")
				.where("id", 1)
				.whereNull("deleted_at")
				.limit(1)
				.results([{
					"id": 1
				}]);
		});

		describe("(when the <%= modelName %> exists via path param id)", () => {

			it("should return with no error", done => {
				fetch<%= modelNamePluralPascal %>(actionContext, (error) => {
					should.not.exist(error);
					done();
				});
			});

			it("should execute the <%= modelName %> query", done => {
				fetch<%= modelNamePluralPascal %>(actionContext, () => {
					mockQuerySelectApiKey.called.should.be.true;
					done();
				});
			});
		});
	});

	describe("(when not <%= modelName %> id)", () => {
		describe("(when the id do not exist)", () => {
			let mockQuery;

			beforeEach(() => {
				mockQuery = database.mock
					.select("*")
					.from("<%= modelTableName %>")
					.where("id", 1)
					.whereNull("deleted_at")
					.limit(1)
					.results([]);
			});

			it("should return an NOTFOUND error", done => {
				fetch<%= modelNamePluralPascal %>(actionContext, (error) => {
					error.message.should.contain("NOTFOUND: ");
					done();
				});
			});
		});

		describe("(when there is no id provided)", () => {
			beforeEach(() => {
				actionContext = {};
			});

			it("should return an BADREQUEST error", done => {
				fetch<%= modelNamePluralPascal %>(actionContext, (error) => {
					error.message.should.contain("BADREQUEST: ");
					done();
				});
			});
		});
	});
});
