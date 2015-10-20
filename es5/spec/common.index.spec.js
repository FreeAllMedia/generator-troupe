"use strict";

var path = require("path");
var assert = require("yeoman-generator").assert;
var helpers = require("yeoman-generator").test;
var os = require("os");

describe("troupe", function () {
	var name = undefined;

	before(function (done) {
		name = "model";
		helpers.run(path.join(__dirname, "../../generators/common")).inDir(path.join(os.tmpdir(), "./temp-test")).withOptions({ "skip-install": true }).withPrompts({
			name: name,
			attributes: "name"
		}).on("end", done);
	});

	it("creates cucumber js files", function () {
		assert.file(["es6/features/steps/common/jsonWebToken.js", "es6/features/steps/common/language.js", "es6/features/steps/common/request.js", "es6/features/steps/common/values.js", "es6/features/steps/accessToken.steps.js", "es6/features/support/hooks.js", "es6/features/support/world.js"]);
	});

	it("creates a common step file", function () {
		assert.file(["es6/features/steps/common.steps.js"]);
	});

	it("creates the controllers", function () {
		assert.file(["es6/app/controllers/applicationController.js"]);
	});

	it("creates the managers", function () {
		assert.file(["es6/app/managers/accountManager.js"]);
	});

	it("creates misc files", function () {
		assert.file(["es6/app/errors.js", "es6/app/server.js"]);
	});
});