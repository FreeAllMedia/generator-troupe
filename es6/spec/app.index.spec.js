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
        name: name
      })
      .on("end", done);
  });

  it("creates cucumber js files", () => {
    assert.file([
      `es6/features/steps/${name}/${name}.show.steps.js`,
      `es6/features/steps/${name}/${name}.create.steps.js`,
      `es6/features/steps/${name}/${name}.update.steps.js`,
      `es6/features/steps/${name}/${name}.delete.steps.js`,
      `es6/features/steps/${name}/${name}.list.steps.js`,
      `es6/features/steps/accessToken.steps.js`,
      `es6/features/support/hooks.js`,
      `es6/features/support/world.js`
    ]);
  });

  it("creates a common step file", () => {
    assert.file([
      `es6/features/steps/common.steps.js`
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
      `es6/app/controllers/${name}Controller.js`,
      `es6/app/controllers/applicationController.js`
    ]);
  });

  it("creates the managers", () => {
    assert.file([
      `es6/app/managers/${name}Manager.js`,
      `es6/app/managers/accountManager.js`
    ]);
  });

  it("creates the router", () => {
    assert.file([
      `es6/app/routers/${name}Router.js`,
      `es6/app/routers/${name}Routes.js`
    ]);
  });

  it("creates misc files", () => {
    assert.file([
      `es6/app/errors.js`,
      `es6/app/server.js`
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
