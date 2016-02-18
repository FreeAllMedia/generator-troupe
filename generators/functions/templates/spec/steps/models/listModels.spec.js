import list<%= modelNamePluralPascal %> from "../../../dist/lib/steps/<%= modelNamePlural %>/list<%= modelNamePluralPascal %>.js";
import ActionContext from "../../../dist/lib/actionContext.js";
import Model from "dovima";
import Database from "almaden";
import chai from "chai";

describe("steps/list<%= modelNamePluralPascal %>.js", () => {
	let input;
	let context;
	let actionContext;
	let database;
	let tomorrow;
	let yesterday;
	let should;

	before(() => {
		should = chai.should();
	});

	beforeEach(() => {
		database = Model.database = new Database(require("../../../environment.json").testing);

		input = {};
		context = {};
		actionContext = new ActionContext(input, context);
		actionContext.accountId = 1;
	});

	describe("(when is valid)", () => {

		let mockQuerySelectAccount;

		beforeEach(() => {
			mockQuerySelectAccount = database.mock
				.select("*")
				.from("<%= modelNamePlural %>")
				.whereNull("deleted_at")
				.results([{
					"id": 1
				},
				{
					"id": 2
				}]);
		});

		it("should return with no error", done => {
			list<%= modelNamePluralPascal %>(actionContext, (error) => {
				should.not.exist(error);
				done();
			});
		});

		it("should execute the account query", done => {
			list<%= modelNamePluralPascal %>(actionContext, () => {
				mockQuerySelectAccount.called.should.be.true;
				done();
			});
		});
	});
});
