import Model/*, {isNotEmpty}*/ from "dovima";

export default class <%= modelNamePascal %> extends Model {
	static useSoftDelete() {}

	associate() {
    // this.hasMany("apiKeys", ApiKey);
	}

	validate() {
		// this.ensure("name", isNotEmpty);
	}
}
