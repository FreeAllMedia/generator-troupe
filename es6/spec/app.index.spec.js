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

  it("creates step files", () => {
    assert.file([
      `es6/features/steps/${name}/${name}.common.steps.js`,
      `es6/features/steps/${name}/${name}.show.steps.js`,
      `es6/features/steps/${name}/${name}.create.steps.js`,
      `es6/features/steps/${name}/${name}.update.steps.js`,
      `es6/features/steps/${name}/${name}.delete.steps.js`,
      `es6/features/steps/${name}/${name}.list.steps.js`
    ]);
  });

  it("creates the fixture file", () => {
    assert.file([
      `es6/spec/fixtures/${name}s.json`
    ]);
  });

  it("creates the controller", () => {
    assert.file([
      `es6/app/controllers/${name}Controller.js`
    ]);
  });

  describe("(about the content of every feature)", () => {
    it("should have some this.querySpy = on it", () => {
      assert.fileContent([[`es6/features/steps/${name}/${name}.show.steps.js`, "this.querySpy ="]]);
    });

    describe("(controller content)", () => {
        it("should have filters for validation", () => {
            assert.fileContent([
                    [`es6/app/controllers/${name}Controller.js`, "filters()"],
                    [`es6/app/controllers/${name}Controller.js`, "[validateId]"],
                    [`es6/app/controllers/${name}Controller.js`, "[validateData]"]
                ]);
        });
    });
  });
});
