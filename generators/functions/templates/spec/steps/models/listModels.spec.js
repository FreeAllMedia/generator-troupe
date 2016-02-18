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
		database = Model.database = new Database({
			"client": "mysql",
			"debug": true
		});

		input = {};
		context = {};
		actionContext = new ActionContext(input, context);
		actionContext.accountId = 1;
	});

	describe("(when is valid)", () => {

		let mockQuerySelect;

		beforeEach(() => {
			mockQuerySelect = database.mock
				.select("*")
				.from("<%= modelTableName %>")
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
				mockQuerySelect.called.should.be.true;
				done();
			});
		});
	});
});
