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
    assert.file(["features/" + name + "/" + name + ".show.feature", "features/" + name + "/" + name + ".create.feature", "features/" + name + "/" + name + ".update.feature", "features/" + name + "/" + name + ".delete.feature", "features/" + name + "/" + name + ".list.feature"]);
  });
});