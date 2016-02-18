
export default class <%= modelNamePluralPascal %>Functions {
	constructor() {
		this.path = `${__dirname}/../../../../dist/lib/lambdas/<%= modelNamePlural %>/`;
		this.addFunction("<%= modelNamePlural %>Show");
		this.addFunction("<%= modelNamePlural %>Create");
		this.addFunction("<%= modelNamePlural %>Update");
		this.addFunction("<%= modelNamePlural %>Delete");
		this.addFunction("<%= modelNamePlural %>List");
	}

	addFunction(newFunction) {
		if(!this.functions) {
			this.functions = [];
		}

		this.functions.push(newFunction);
	}

	getLambdaFunctions() {
		const map = this.functions.map(
			(functionName) => {
				return { name: functionName, path: `${this.path}${functionName}.js` };
			}
		);

		return map;
	}
}
