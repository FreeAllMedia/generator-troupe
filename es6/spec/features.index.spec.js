const path = require("path");
import assert from "yeoman-assert";
import test from "yeoman-test";
const os = require("os");

describe("troupe:features", () => {
	let name;

	before((done) => {
		name = "model";
		test.run(path.join(__dirname, "../../generators/features"))
			.inDir(path.join(os.tmpdir(), "./temp-test"))
			.withOptions({ "skip-install": true })
			.withPrompts({
				name: name,
				attributes: "name"
			})
			.on("end", done);
	});

	it("creates feature files", () => {
		assert.file([
			`features/${name}/${name}.show.feature`,
			`features/${name}/${name}.create.feature`,
			`features/${name}/${name}.update.feature`,
			`features/${name}/${name}.delete.feature`,
			`features/${name}/${name}.list.feature`,
			`features/accessToken.feature`
		]);
	});
});
