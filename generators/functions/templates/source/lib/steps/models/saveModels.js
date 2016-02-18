import <%= modelNamePascal %> from "../../models/<%= modelName %>.js";

export default function save<%= modelNamePluralPascal %>(actionContext, next) {
	let <%= modelName %>Parameters;
	if(actionContext.<%= modelName %>Parameters) {
		<%= modelName %>Parameters = actionContext.<%= modelName %>Parameters;
	}
	actionContext.<%= modelName %> = new <%= modelNamePascal %>(<%= modelName %>Parameters);
	if(actionContext.<%= modelName %>Id) {
		actionContext.<%= modelName %>.id = actionContext.<%= modelName %>Id;
	}

	actionContext.<%= modelName %>.save((saveError) => {
		next(saveError);
	});
}
