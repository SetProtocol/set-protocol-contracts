//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory
const directoryPath = path.join(__dirname, '../artifacts/json');

//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
    const baseName = file.replace('.json', '');
    const filePath = path.join(__dirname, '../artifacts/json', file);
    const newPath = path.join(__dirname, '../artifacts/ts', `${baseName}.ts`);
    const contents = fs.readFileSync(filePath, 'utf8');
    let json = JSON.parse(contents);
    delete json["ast"]
    delete json["legacyAST"]

    fs.writeFileSync(newPath, `export const ${baseName} = `);
    fs.appendFileSync(newPath, `${JSON.stringify(json)}`);
    console.log(`Finished writing to ${newPath}`);
  });
});
