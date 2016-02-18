import delete<%= modelNamePluralPascal %> from "../../../dist/lib/steps/<%= modelNamePlural %>/delete<%= modelNamePluralPascal %>.js";
import regexs from "../../regexs.js";
import Model from "dovima";
import Database from "almaden";
import chai from "chai";
import Account from "../../../dist/lib/models/account.js";

describe("steps/delete<%= modelNamePluralPascal %>.js", () => {
	let actionContext;
	let database;
	let tomorrow;
	let yesterday;
	let should;
	let account;

	before(() => {
		should = chai.should();
	});

	beforeEach(() => {
		database = Model.database = new Database(require("../../../environment.json").testing);

		account = new Account({ id: 1, name: "guest" });

		actionContext = { account };
	});

	describe("(when is valid)", () => {

		let mockQueryInsert;
		let mockQueryApiKeyInsert;
		let mockQueryRoleSelect;
		let mockQueryApiKeyRoleInsert;

		beforeEach(() => {
			mockQueryInsert = database.mock
				.update({
					"name": "guest",
					"updated_at": regexs.date,
					"deleted_at": regexs.date
				})
				.into("<%= modelNamePlural %>")
				.where("id", 1)
				.results([1]);
		});

		it("should return with no error", done => {
			delete<%= modelNamePluralPascal %>(actionContext, (error) => {
				should.not.exist(error);
				done();
			});
		});

		it("should set the account in the action context", done => {
			delete<%= modelNamePluralPascal %>(actionContext, () => {
				actionContext.account.id.should.equal(1);
				done();
			});
		});

		it("should execute the account query", done => {
			delete<%= modelNamePluralPascal %>(actionContext, () => {
				mockQueryInsert.called.should.be.true;
				done();
			});
		});
	});
});
