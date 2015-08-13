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
      name: name
    }).on("end", done);
  });

  it("creates step files", function () {
    assert.file(["es6/features/steps/" + name + "/" + name + ".common.steps.js", "es6/features/steps/" + name + "/" + name + ".show.steps.js", "es6/features/steps/" + name + "/" + name + ".create.steps.js", "es6/features/steps/" + name + "/" + name + ".update.steps.js", "es6/features/steps/" + name + "/" + name + ".delete.steps.js", "es6/features/steps/" + name + "/" + name + ".list.steps.js"]);
  });

  it("creates the fixture file", function () {
    assert.file(["es6/spec/fixtures/" + name + "s.json"]);
  });

  it("creates the controller", function () {
    assert.file(["es6/app/controllers/" + name + "Controller.js"]);
  });

  describe("(about the content of every feature)", function () {
    it("should have some this.querySpy = on it", function () {
      assert.fileContent([["es6/features/steps/" + name + "/" + name + ".show.steps.js", "this.querySpy ="]]);
    });

    describe("(controller content)", function () {
      it("should have filters for validation", function () {
        assert.fileContent([["es6/app/controllers/" + name + "Controller.js", "filters()"], ["es6/app/controllers/" + name + "Controller.js", "[validateId]"], ["es6/app/controllers/" + name + "Controller.js", "[validateData]"]]);
      });
    });
  });
});