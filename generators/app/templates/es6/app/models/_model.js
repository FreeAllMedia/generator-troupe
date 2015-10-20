import Model from "dovima";
import {isNotEmpty} from "proven";

export default class <%= Name %> extends Model {

	static useSoftDelete() {}

	//TODO: complete validate and initialize
	validate() {
		<%- validateString %>
	}

}
