import inflect from "jargon";

export function processContext(props) {
  const context = {
    name: props.name,
    Name: inflect(props.name).pascal.toString(),
    names: inflect(props.name).plural.toString(),
    _name: inflect(props.name).snake.toString(),
    attributeString: props.attributeString
  };

  context.attributes = context.attributeString.split(",");
  //filling a strings that are going to be used in the templates to mock a test entity
  context.attributesWithValues = "";
  context.fieldsWithValues = "";
  context.validateString = `this.ensure(\"${context.attributes.join("\", isNotEmpty);\n\t\tthis.ensure(\"")}\", isNotEmpty);`;
  context.extractAttributesString = `${context.attributes.join(",\n\t\t")}`;
  context.validateAttributesString = `this.ensure(["${context.attributes.join("\",\n\t\t\t\"")}"], areOnlyProperties);`;
  context.attributes.forEach(
    (attributeName, index) => {
      if(index > 0) {
        context.attributesWithValues += `,\n\t`;
        context.fieldsWithValues += `,\n\t\t\t\t`;
      }
      const snakeAttributeName = inflect(attributeName).snake.toString();
      context.attributesWithValues += `\"${attributeName}\": \"test ${attributeName}\"`;
      context.fieldsWithValues += `\"${snakeAttributeName}\": ${context.name}.${attributeName}`;
    });
  context.attributesJson = JSON.stringify(context.attributesWithValues);
  return context;
}

export function getPrompts() {
  return [{
    type: "input",
    name: "name",
    message: "What is the model name? (use camel case please)",
    default: "myModel"
  },
  {
    type: "input",
    name: "attributeString",
    message: "Provide the model attributes sepparated by a comma? (like name,link,email,contactPhone)",
    default: "name"
  }];
}
