const path = require("path");
const assert = require("yeoman-generator").assert;
const helpers = require("yeoman-generator").test;
const os = require("os");

describe("troupe", () => {
	let name;

	before((done) => {
		name = "model";
		helpers.run(path.join(__dirname, "../../generators/app"))
			.inDir(path.join(os.tmpdir(), "./temp-test"))
			.withOptions({ "skip-install": true })
			.withPrompts({
				name: name,
				attributes: "name"
			})
			.on("end", done);
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
