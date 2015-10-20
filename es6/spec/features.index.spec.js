const path = require("path");
const assert = require("yeoman-generator").assert;
const helpers = require("yeoman-generator").test;
const os = require("os");

describe("troupe:features", () => {
	let name;

	before((done) => {
		name = "model";
		helpers.run(path.join(__dirname, "../../generators/features"))
			.inDir(path.join(os.tmpdir(), "./temp-test"))
			.withOptions({ "skip-install": true })
			.withPrompts({
				name: name
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
