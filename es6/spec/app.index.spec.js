const path = require("path");
import assert from "yeoman-assert";
import test from "yeoman-test";
const os = require("os");

describe("troupe", () => {
	let name;

	before((done) => {
		name = "model";
		test.run(path.join(__dirname, "../../generators/app"))
			.inDir(path.join(os.tmpdir(), "./temp-test"))
			.withOptions({ "skip-install": true })
			.withPrompts({
				name: name,
				attributes: "name"
			})
			.on("end", done);
	});

	it("creates cucumber js files", () => {
		assert.file([
			`es6/features/steps/${name}/${name}.show.steps.js`,
			`es6/features/steps/${name}/${name}.create.steps.js`,
			`es6/features/steps/${name}/${name}.update.steps.js`,
			`es6/features/steps/${name}/${name}.delete.steps.js`,
			`es6/features/steps/${name}/${name}.list.steps.js`
		]);
	});

	it("creates the model and his spec", () => {
		assert.file([
			`es6/app/models/${name}.js`,
			`es6/spec/${name}.spec.js`
		]);
	});

	it("creates the controllers", () => {
		assert.file([
			`es6/app/controllers/${name}Controller.js`
		]);
	});

	it("creates the managers", () => {
		assert.file([
			`es6/app/managers/${name}Manager.js`
		]);
	});

	it("creates the router", () => {
		assert.file([
			`es6/app/routers/${name}Router.js`,
			`es6/app/routers/${name}Routes.js`
		]);
	});

	describe("(about the content of every feature)", () => {
		it("should have some this.database = on it", () => {
			assert.fileContent([[`es6/features/steps/${name}/${name}.show.steps.js`, "this.database"]]);
		});

		describe("(controller content)", () => {
				it("should have filters for validation", () => {
						assert.fileContent([
										[`es6/app/controllers/${name}Controller.js`, "filters()"],
										[`es6/app/controllers/${name}Controller.js`, "[pullAccountIdFromRequest]"]
								]);
				});
		});
	});
});
