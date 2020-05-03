//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory
const directoryPath = path.join(__dirname, '../artifacts/json');

let i = 0;
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
    fs.readFile(filePath, 'utf8', function(err, contents) {
      if (err) { return console.log(`Failed to read ${filePath}`); }
      let json = JSON.parse(contents);
      delete json["ast"]
      delete json["legacyAST"]

      fs.writeFile(newPath, `export const ${baseName} = `, function(err) {
        if (err) { return console.log(`Failed to write to ${newPath}`); }
        fs.appendFile(newPath, `${JSON.stringify(json)}`, function(err) {
          if (err) { return console.log(`Failed to write to ${newPath}`); }
          console.log(`Finished writing to ${newPath}`);
        });
      });
    });
  });
});
