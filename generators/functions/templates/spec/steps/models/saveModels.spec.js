import save<%= modelNamePluralPascal %> from "../../../dist/lib/steps/<%= modelNamePlural %>/save<%= modelNamePluralPascal %>.js";
import <%= modelNamePascal %> from "../../../dist/lib/models/<%= modelName %>.js";
import regexs from "../../regexs.js";
import Model from "dovima";
import Database from "almaden";
import chai from "chai";

describe("steps/save<%= modelNamePluralPascal %>.js", () => {
	let actionContext;
	let database;
	let should;

	before(() => {
		should = chai.should();
	});

	beforeEach(() => {
		database = Model.database = new Database({
			"client": "mysql",
			"debug": true
		});

		actionContext = { <%= modelName %>Parameters: new <%= modelNamePascal %>({ name: "guest" }) };
	});

	describe("(when is valid)", () => {

		let mockQueryInsert;

		beforeEach(() => {
			mockQueryInsert = database.mock
				.insert({
					"name": "guest",
					"created_at": regexs.date
				})
				.into("<%= modelTableName %>")
				.results([1]);
		});

		it("should return with no error", done => {
			save<%= modelNamePluralPascal %>(actionContext, (error) => {
				should.not.exist(error);
				done();
			});
		});

		it("should set the <%= modelName %> in the action context", done => {
			save<%= modelNamePluralPascal %>(actionContext, () => {
				actionContext.<%= modelName %>.id.should.equal(1);
				done();
			});
		});

		it("should execute the <%= modelName %> insert query", done => {
			save<%= modelNamePluralPascal %>(actionContext, () => {
				mockQueryInsert.called.should.be.true;
				done();
			});
		});
	});

	describe("(when is valid and existing)", () => {
		let mockQueryUpdate;

		beforeEach(() => {
			actionContext = { <%= modelName %>Id: 1, <%= modelName %>Parameters: new <%= modelNamePascal %>({ name: "guest1" }) };
			mockQueryUpdate = database.mock
				.update({
					"name": "guest1",
					"updated_at": regexs.date
				})
				.into("<%= modelTableName %>")
				.where("id", 1)
				.results([1]);
		});

		it("should return with no error", done => {
			save<%= modelNamePluralPascal %>(actionContext, (error) => {
				should.not.exist(error);
				done();
			});
		});

		it("should set the <%= modelName %> in the action context", done => {
			save<%= modelNamePluralPascal %>(actionContext, () => {
				actionContext.<%= modelName %>.id.should.equal(1);
				done();
			});
		});

		it("should execute the <%= modelName %> update query", done => {
			save<%= modelNamePluralPascal %>(actionContext, () => {
				mockQueryUpdate.called.should.be.true;
				done();
			});
		});
	});

	describe("(when the new model is invalid)", () => {
		beforeEach(() => {
			actionContext = { <%= modelName %>Id: 1, <%= modelName %>Parameters: new <%= modelNamePascal %>({ name: null }) };
		});

		it("should return with error", done => {
			save<%= modelNamePluralPascal %>(actionContext, (error) => {
				error.message.should.contain("invalid");
				done();
			});
		});
	});
});
