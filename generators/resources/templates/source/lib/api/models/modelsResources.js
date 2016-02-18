export default class <%= modelNamePluralPascal %>Resources {
	constructor() {
		this.addResource("/<%= modelNamePlural %>/{id}", "get", "<%= modelNamePlural %>Show");
		this.addResource("/<%= modelNamePlural %>", "post", "<%= modelNamePlural %>Create");
		this.addResource("/<%= modelNamePlural %>/{id}", "put", "<%= modelNamePlural %>Update");
		this.addResource("/<%= modelNamePlural %>/{id}", "delete", "<%= modelNamePlural %>Delete");
		this.addResource("/<%= modelNamePlural %>", "get", "<%= modelNamePlural %>List");
		this.addResource("/<%= modelNamePlural %>/{id}", "options");
		this.addResource("/<%= modelNamePlural %>", "options");
	}

	addResource(path, method, functionName) {
		if(!this.resources) {
			this.resources = [];
		}

		const result = { path, method };
		if(functionName) {
			result.functionName = functionName;
		}

		this.resources.push(result);
	}
}
