import <%= modelNamePluralPascal %>Resources from "../../../dist/lib/api/<%= modelNamePlural %>/<%= modelNamePlural %>Resources.js";

describe("<%= modelNamePluralPascal %> Functions", () => {
	let <%= modelNamePlural %>Resources;

	beforeEach(() => {
		<%= modelNamePlural %>Resources = new <%= modelNamePluralPascal %>Resources();
	});

	it("should add all the resources", () => {
		<%= modelNamePlural %>Resources.resources.should.eql([
			{ path: "/<%= modelNamePlural %>/{id}", method: "get", functionName: "<%= modelNamePlural %>Show" },
			{ path: "/<%= modelNamePlural %>", method: "post", functionName: "<%= modelNamePlural %>Create" },
			{ path: "/<%= modelNamePlural %>/{id}", method: "put", functionName: "<%= modelNamePlural %>Update" },
			{ path: "/<%= modelNamePlural %>/{id}", method: "delete", functionName: "<%= modelNamePlural %>Delete" },
			{ path: "/<%= modelNamePlural %>", method: "get", functionName: "<%= modelNamePlural %>List" },
			{ path: "/<%= modelNamePlural %>/{id}", method: "options" },
			{ path: "/<%= modelNamePlural %>", method: "options" }
		]);
	});
});
