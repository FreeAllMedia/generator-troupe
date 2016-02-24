import check<%= modelNamePascal %>Ownership from "../../../dist/lib/steps/<%= modelNamePlural %>/check<%= modelNamePascal %>Ownership.js";
import chai from "chai";
import <%= modelNamePascal %> from "../../../dist/lib/models/<%= modelName %>.js";

describe("check<%= modelNamePascal %>Ownership", () => {
	let actionContext;
	let should;
	let <%= modelName %>;

	before(() => {
		should = chai.should();
	});

	beforeEach(() => {
		<%= modelName %> = new <%= modelNamePascal %>({ id: 1, name: "guest", accountId: 1 });

		actionContext = { <%= modelName %>, accountId: 1 };
	});

	describe("one entity ownership check", () => {
		it("should call next when the check is succesful", done => {
			check<%= modelNamePascal %>Ownership(actionContext, (error) => {
				should.not.exist(error);
				done();
			});
		});

		it("should throw an error if the check fails", done => {
			actionContext.accountId = 2;
			check<%= modelNamePascal %>Ownership(actionContext, (error) => {
				should.exist(error);
				done();
			});
		});
	});

	it("should work for an admin", done => {
		delete actionContext.<%= modelName %>;
		actionContext.isAdmin = true;
		check<%= modelNamePascal %>Ownership(actionContext, (error) => {
			should.not.exist(error);
			done();
		});
	});

	it("should throw an error if there is no valid parameter provided to it", done => {
		delete actionContext.<%= modelName %>;
		check<%= modelNamePascal %>Ownership(actionContext, (error) => {
			should.exist(error);
			done();
		});
	});
});
