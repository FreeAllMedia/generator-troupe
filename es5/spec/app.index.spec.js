"use strict";

var path = require("path");
var assert = require("yeoman-generator").assert;
var helpers = require("yeoman-generator").test;
var os = require("os");

describe("troupe", function () {
	var name = undefined;

	before(function (done) {
		name = "model";
		helpers.run(path.join(__dirname, "../../generators/app")).inDir(path.join(os.tmpdir(), "./temp-test")).withOptions({ "skip-install": true }).withPrompts({
			name: name,
			attributes: "name"
		}).on("end", done);
	});

	it("creates the model and his spec", function () {
		assert.file(["es6/app/models/" + name + ".js", "es6/spec/models/" + name + ".spec.js"]);
	});

	it("creates the controllers", function () {
		assert.file(["es6/app/controllers/" + name + "Controller.js"]);
	});

	it("creates the router", function () {
		assert.file(["es6/app/routers/" + name + "Router.js", "es6/app/routers/" + name + "Routes.js"]);
	});

	describe("(about the content of every feature)", function () {
		describe("(controller content)", function () {
			it("should have filters for validation", function () {
				assert.fileContent([["es6/app/controllers/" + name + "Controller.js", "filters()"], ["es6/app/controllers/" + name + "Controller.js", "[pullAccountIdFromRequest]"]]);
			});
		});
	});
});