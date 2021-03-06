"use strict";

var path = require("path");
var assert = require("yeoman-generator").assert;
var helpers = require("yeoman-generator").test;
var os = require("os");

describe("troupe:features", function () {
  var name = undefined;

  before(function (done) {
    name = "model";
    helpers.run(path.join(__dirname, "../../generators/features")).inDir(path.join(os.tmpdir(), "./temp-test")).withOptions({ "skip-install": true }).withPrompts({
      name: name
    }).on("end", done);
  });

  it("creates feature files", function () {
    assert.file(["es6/features/" + name + "/" + name + ".show.feature", "es6/features/" + name + "/" + name + ".create.feature", "es6/features/" + name + "/" + name + ".update.feature", "es6/features/" + name + "/" + name + ".delete.feature", "es6/features/" + name + "/" + name + ".list.feature"]);
  });
});