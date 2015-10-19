import <%= Name %> from "../app/models/<%= name %>.js";
import Model from "dovima";

describe("<%= Name %>", () => {
  it("should be an instance of a Model", () => {
    (new <%= Name %>()).should.be.instanceOf(Model);
  });
});
