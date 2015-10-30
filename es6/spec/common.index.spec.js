const path = require("path");
const assert = require("yeoman-generator").assert;
const helpers = require("yeoman-generator").test;
const os = require("os");

describe("troupe:common", () => {
	let name;

	before((done) => {
		name = "model";
		helpers.run(path.join(__dirname, "../../generators/common"))
			.inDir(path.join(os.tmpdir(), "./temp-test"))
			.withOptions({ "skip-install": true })
			.withPrompts({
				name: name,
				attributes: "name"
			})
			.on("end", done);
	});

	it("creates common cucumber js files", () => {
		assert.file([
			`es6/features/steps/common/jsonWebToken.js`,
			`es6/features/steps/common/language.js`,
			`es6/features/steps/common/request.js`,
			`es6/features/steps/common/values.js`,
			`es6/features/steps/accessToken.steps.js`,
			`es6/features/support/hooks.js`,
			`es6/features/support/world.js`
		]);
	});

	it("creates a common steps file", () => {
		assert.file([
			`es6/features/steps/common.steps.js`
		]);
	});

	it("creates the common controllers", () => {
		assert.file([
			`es6/app/controllers/applicationController.js`
		]);
	});

	it("creates other common files", () => {
		assert.file([
			`es6/app/errors.js`,
			`es6/app/server.js`
		]);
	});
});
