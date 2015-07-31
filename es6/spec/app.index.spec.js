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
      `features/steps/${name}/${name}.common.steps.js`,
      `features/steps/${name}/${name}.show.steps.js`,
      `features/steps/${name}/${name}.create.steps.js`,
      `features/steps/${name}/${name}.update.steps.js`,
      `features/steps/${name}/${name}.delete.steps.js`,
      `features/steps/${name}/${name}.list.steps.js`
    ]);
  });

  it("creates the fixture file", () => {
    assert.file([
      `spec/fixtures/${name}s.json`
    ]);
  });

  it("creates the controller", () => {
    assert.file([
      `app/controllers/${name}Controller.js`
    ]);
  });

  describe("(about the content of every feature)", () => {
    it("should have some this.querySpy = on it", () => {
      assert.fileContent([[`features/steps/${name}/${name}.show.steps.js`, "this.querySpy ="]]);
    });

    describe("(controller content)", () => {
        it("should have filters for validation", () => {
            assert.fileContent([
                    [`app/controllers/${name}Controller.js`, "filters()"],
                    [`app/controllers/${name}Controller.js`, "[validateId]"],
                    [`app/controllers/${name}Controller.js`, "[validateData]"]
                ]);
        });
    });
  });
});
