import path from "path";
import assert from "yeoman-assert";
import test from "yeoman-test";
import os from "os";

describe("troupe:functions", () => {
	let modelName;

	before((done) => {
		modelName = "apple";
		test.run(path.join(__dirname, "../../generators/functions"))
			.inDir(path.join(os.tmpdir(), "./temp-test"))
			.withPrompts({
				modelName
			})
			.on("end", done);
	});

	it("should set the key content into the files", () => {
		assert.fileContent([
			[`source/lib/lambdas/${modelName}s/${modelName}sShow.js`, `class ApplesShow {`],
			[`source/lib/lambdas/${modelName}s/${modelName}sCreate.js`, `class ApplesCreate {`],
			[`source/lib/lambdas/${modelName}s/${modelName}sUpdate.js`, `class ApplesUpdate {`],
			[`source/lib/lambdas/${modelName}s/${modelName}sDelete.js`, `class ApplesDelete {`],
			[`source/lib/lambdas/${modelName}s/${modelName}sList.js`, `class ApplesList {`],
			[`spec/lambdas/${modelName}s/${modelName}sShow.spec.js`, `import ApplesShow from`],
			[`spec/lambdas/${modelName}s/${modelName}sCreate.spec.js`, `import ApplesCreate from`],
			[`spec/lambdas/${modelName}s/${modelName}sUpdate.spec.js`, `import ApplesUpdate from`],
			[`spec/lambdas/${modelName}s/${modelName}sDelete.spec.js`, `import ApplesDelete from`],
			[`spec/lambdas/${modelName}s/${modelName}sList.spec.js`, `import ApplesList from`],
			[`source/lib/api/${modelName}s/${modelName}sFunctions.js`, `class ApplesFunctions`],
			[`spec/api/${modelName}s/${modelName}sFunctions.spec.js`, `import ApplesFunctions`],
			[`source/lib/steps/${modelName}s/deleteApples.js`, `function deleteApples`],
			[`source/lib/steps/${modelName}s/fetchApples.js`, `function fetchApples`],
			[`source/lib/steps/${modelName}s/listApples.js`, `function listApples`],
			[`source/lib/steps/${modelName}s/saveApples.js`, `function saveApples`],
			[`spec/steps/${modelName}s/deleteApples.spec.js`, `import deleteApples`],
			[`spec/steps/${modelName}s/fetchApples.spec.js`, `import fetchApples`],
			[`spec/steps/${modelName}s/listApples.spec.js`, `import listApples`],
			[`spec/steps/${modelName}s/saveApples.spec.js`, `import saveApples`]
		]);
	});

	it("should create the function files", () => {
		assert.file([
			`source/lib/lambdas/${modelName}s/${modelName}sShow.js`,
			`source/lib/lambdas/${modelName}s/${modelName}sCreate.js`,
			`source/lib/lambdas/${modelName}s/${modelName}sUpdate.js`,
			`source/lib/lambdas/${modelName}s/${modelName}sDelete.js`,
			`source/lib/lambdas/${modelName}s/${modelName}sList.js`,
			`spec/lambdas/${modelName}s/${modelName}sShow.spec.js`,
			`spec/lambdas/${modelName}s/${modelName}sCreate.spec.js`,
			`spec/lambdas/${modelName}s/${modelName}sUpdate.spec.js`,
			`spec/lambdas/${modelName}s/${modelName}sDelete.spec.js`,
			`spec/lambdas/${modelName}s/${modelName}sList.spec.js`,
			`source/lib/steps/${modelName}s/deleteApples.js`,
			`source/lib/steps/${modelName}s/fetchApples.js`,
			`source/lib/steps/${modelName}s/listApples.js`,
			`source/lib/steps/${modelName}s/saveApples.js`,
			`spec/steps/${modelName}s/deleteApples.spec.js`,
			`spec/steps/${modelName}s/fetchApples.spec.js`,
			`spec/steps/${modelName}s/listApples.spec.js`,
			`spec/steps/${modelName}s/saveApples.spec.js`,
			`source/lib/api/${modelName}s/${modelName}sFunctions.js`,
			`spec/api/${modelName}s/${modelName}sFunctions.spec.js`
		]);
	});
});
