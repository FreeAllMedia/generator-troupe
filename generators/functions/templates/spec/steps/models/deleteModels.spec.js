import delete<%= modelNamePluralPascal %> from "../../../dist/lib/steps/<%= modelNamePlural %>/delete<%= modelNamePluralPascal %>.js";
import regexs from "../../regexs.js";
import Model from "dovima";
import Database from "almaden";
import chai from "chai";
import <%= modelNamePascal %> from "../../../dist/lib/models/<%= modelName %>.js";

describe("steps/delete<%= modelNamePluralPascal %>.js", () => {
	let actionContext;
	let database;
	let should;
	let <%= modelName %>;

	before(() => {
		should = chai.should();
	});

	beforeEach(() => {
		database = Model.database = new Database({
			"client": "mysql",
			"debug": true
		});

		<%= modelName %> = new <%= modelNamePascal %>({ id: 1, name: "guest" });

		actionContext = { <%= modelName %> };
	});

	describe("(when is valid)", () => {

		let mockQueryUpdate;

		beforeEach(() => {
			mockQueryUpdate = database.mock
				.update({
					"name": "guest",
					"updated_at": regexs.date,
					"deleted_at": regexs.date
				})
				.into("<%= modelTableName %>")
				.where("id", 1)
				.results([1]);
		});

		it("should return with no error", done => {
			delete<%= modelNamePluralPascal %>(actionContext, (error) => {
				should.not.exist(error);
				done();
			});
		});

		it("should set the <%= modelName %> in the action context", done => {
			delete<%= modelNamePluralPascal %>(actionContext, () => {
				actionContext.<%= modelName %>.id.should.equal(1);
				done();
			});
		});

		it("should execute the <%= modelName %> query", done => {
			delete<%= modelNamePluralPascal %>(actionContext, () => {
				mockQueryUpdate.called.should.be.true;
				done();
			});
		});
	});
});
