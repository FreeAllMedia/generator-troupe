import Model, {isNotEmpty, areOnlyProperties} from "dovima";

export default class <%= Name %> extends Model {

	static useSoftDelete() {}

	//TODO: complete validate and initialize
	validate() {
		<%- validateString %>

		<%- validateAttributesString %>
	}

}
