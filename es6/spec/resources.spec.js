import path from "path";
import assert from "yeoman-assert";
import test from "yeoman-test";
import os from "os";

describe("troupe:resources", () => {
	let modelName;

	before((done) => {
		modelName = "apple";
		test.run(path.join(__dirname, "../../generators/resources"))
			.inDir(path.join(os.tmpdir(), "./temp-test"))
			.withPrompts({
				modelName
			})
			.on("end", done);
	});

	it("should set the key content into the files", () => {
		assert.fileContent([
			[`source/lib/api/${modelName}s/${modelName}sResources.js`, `class ApplesResources {`]
		]);
	});

	it("should create the resource file", () => {
		assert.file([
			`source/lib/api/${modelName}s/${modelName}sResources.js`
		]);
	});
});
