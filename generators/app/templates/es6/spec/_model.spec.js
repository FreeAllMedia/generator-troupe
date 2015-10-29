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

	describe("validations", function () {
<% attributes.forEach(function eachAttributeSpecValidation(attributeName) { %>
		it("should validate that <%= attributeName %> is not empty", function () {
			item.validations.<%= attributeName %>.should.eql([{
				validator: isNotEmpty
			}]);
		});
<%});%>
	});
});
