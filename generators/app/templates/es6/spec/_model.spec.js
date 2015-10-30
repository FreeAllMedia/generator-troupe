import <%= Name %> from "../../app/models/<%= name %>.js";
import Model, {isNotEmpty, areOnlyAttributes} from "dovima";

describe("<%= Name %>", () => {
	let <%= name %>;
	beforeEach(() => {
		<%= name %> = new <%= Name %>();
	});

	it("should be an instance of a Model", () => {
		<%= name %>.should.be.instanceOf(Model);
	});
});
