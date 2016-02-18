import <%= modelNamePluralPascal %>Functions from "../../../dist/lib/api/<%= modelNamePlural %>/<%= modelNamePlural %>Functions.js";

describe("<%= modelNamePluralPascal %> Functions", () => {
	let <%= modelNamePlural %>Functions;
	let path;

	beforeEach(() => {
		<%= modelNamePlural %>Functions = new <%= modelNamePluralPascal %>Functions();
		path = `${__dirname}/../../../../dist/lib/lambdas/<%= modelNamePlural %>/`.replace("/spec/api/<%= modelNamePlural %>/", "/dist/lib/api/<%= modelNamePlural %>/");
	});

	it("should add all the functions", () => {
		<%= modelNamePlural %>Functions.functions.should.eql([
			"<%= modelNamePlural %>Show",
			"<%= modelNamePlural %>Create",
			"<%= modelNamePlural %>Update",
			"<%= modelNamePlural %>Delete",
			"<%= modelNamePlural %>List"
		]);
	});

	it("should add the basepath", () => {
		<%= modelNamePlural %>Functions.path.should.equal(path);
	});

	it("should generate the appropiate aws lambda metadata", () => {
		<%= modelNamePlural %>Functions.getLambdaFunctions().should.eql([
			{ name: "<%= modelNamePlural %>Show", path: `${path}<%= modelNamePlural %>Show.js` },
			{ name: "<%= modelNamePlural %>Create", path: `${path}<%= modelNamePlural %>Create.js` },
			{ name: "<%= modelNamePlural %>Update", path: `${path}<%= modelNamePlural %>Update.js` },
			{ name: "<%= modelNamePlural %>Delete", path: `${path}<%= modelNamePlural %>Delete.js` },
			{ name: "<%= modelNamePlural %>List", path: `${path}<%= modelNamePlural %>List.js` }
		]);
	});
});
