const fs = require("fs");

const args = process.argv.slice(2);
const scssFile = args[0];

if (!scssFile) {
  console.error(
    "Please provide the path to your scss file as an argument to this program."
  );
  process.exit(1);
}

function convert() {
  fs.readFile(scssFile, "utf8", function (err, data) {
    if (err) {
      console.error(`There was an error reading the file at "${scssFile}".`);
      console.error(err);
      process.exit(1);
    } else {
      const variablePattern = /\$(.*?):[\s](.*?);/g;
      const variableMatches = variablePattern.exec(data);
      const typescriptResult = `
export enum ScssVariable = {
${variableMatches.map((variableMatch) => {
  const variableName = variableMatch[0];
  const variableValue = variableMatch[1];
  return `${variableName
    .replace(`/^\$`, "")
    .replace(`-`, "_")
    .toUpperCase()} = '${variableName}'`;
})}
}

const scssVariables = {
${variableMatches.map((variableMatch) => {
  const variableName = variableMatch[0];
  const variableValue = variableMatch[1];
  return `${variableName} = '${variableValue}'`;
})}
}`;
    }
  });
}

convert();
