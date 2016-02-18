import path from "path";
import assert from "yeoman-assert";
import test from "yeoman-test";
import os from "os";

describe("troupe:model", () => {
	let modelName;

	before((done) => {
		modelName = "apple";
		test.run(path.join(__dirname, "../../generators/model"))
			.inDir(path.join(os.tmpdir(), "./temp-test"))
			.withPrompts({
				modelName
			})
			.on("end", done);
	});

	it("should set the key content into the files", () => {
		assert.fileContent([
			[`source/lib/apples/${modelName}.js`, `Apple extends Model`]
		]);
	});

	it("should create the model file", () => {
		assert.file([
			`source/lib/apples/${modelName}.js`
		]);
	});
});
