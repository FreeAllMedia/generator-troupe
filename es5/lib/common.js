"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processContext = processContext;
exports.getPrompts = getPrompts;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _jargon = require("jargon");

var _jargon2 = _interopRequireDefault(_jargon);

function processContext(props) {
  var context = {
    name: props.name,
    Name: (0, _jargon2["default"])(props.name).pascal.toString(),
    names: (0, _jargon2["default"])(props.name).plural.toString(),
    _name: (0, _jargon2["default"])(props.name).snake.toString(),
    attributeString: props.attributeString
  };

  context.attributes = context.attributeString.split(",");
  //filling a strings that are going to be used in the templates to mock a test entity
  context.attributesWithValues = "";
  context.fieldsWithValues = "";
  context.validateString = "this.ensure(\"" + context.attributes.join("\", isNotEmpty);\n\t\tthis.ensure(\"") + "\", isNotEmpty);";
  context.extractAttributesString = "" + context.attributes.join(",\n\t\t");
  context.validateAttributesString = "this.ensure([\"" + context.attributes.join("\",\n\t\t\t\"") + "\"], areOnlyProperties);";
  context.attributes.forEach(function (attributeName, index) {
    if (index > 0) {
      context.attributesWithValues += ",\n\t";
      context.fieldsWithValues += ",\n\t\t\t\t";
    }
    var snakeAttributeName = (0, _jargon2["default"])(attributeName).snake.toString();
    context.attributesWithValues += "\"" + attributeName + "\": \"test " + attributeName + "\"";
    context.fieldsWithValues += "\"" + snakeAttributeName + "\": " + context.name + "." + attributeName;
  });
  context.attributesJson = JSON.stringify(context.attributesWithValues);
  return context;
}

function getPrompts() {
  return [{
    type: "input",
    name: "name",
    message: "What is the model name? (use camel case please)",
    "default": "myModel"
  }, {
    type: "input",
    name: "attributeString",
    message: "Provide the model attributes sepparated by a comma? (like name,link,email,contactPhone)",
    "default": "name"
  }];
}