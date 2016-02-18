import <%= modelNamePascal %> from "../../models/<%= modelName %>.js";

export default function list<%= modelNamePluralPascal %>(actionContext, next) {
	<%= modelNamePascal %>.find
		.all
		.results((findError, result) => {
			if(findError) {
				next(findError);
			} else {
				actionContext.<%= modelNamePlural %> = result;
				next();
			}
		});
}
