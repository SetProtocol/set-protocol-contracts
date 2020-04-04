const { promisify } = require('util');
const { resolve, join } = require('path');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const getFiles = async (dir) => {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.reduce((a, f) => a.concat(f), []);
}

const generatedTypePath = join(__dirname, "../types/generated");
const contractPath = join(__dirname, "../contracts");

console.log("Fixing paths in types/generated: fix-generated-type-paths");

let finished = false;
getFiles(contractPath).then((contractFiles) => {
  const contractMapping = {};
  contractFiles.forEach(file => {
    const splitFile = file.split('/');

    contractMapping[splitFile[splitFile.length - 1].replace('.sol', '')] = file;
  });

  getFiles(generatedTypePath).then((generatedFiles) => {
    generatedFiles.forEach(file => {
      const fileContent = fs.readFileSync(file, 'utf8');
      if (fileContent) {
        const regex = /\{ (.*) as ContractArtifacts \}/;
        const found = fileContent.match(regex)

        if (found) {
          const contractName = found[1]

          const contractPath = contractMapping[contractName];
          if (contractPath) {
            const dirRegex = /\/contracts\/([a-zA-Z_0-9\/\-]+)\/.+\.sol/;
            const contractDir = contractPath.match(dirRegex);
            if (contractDir) {
              const result = fileContent.replace(/\.\.\/\.\.\/artifacts\/ts\//g, `../../artifacts/ts/${contractDir[1]}/`);

              fs.writeFile(file, result, 'utf8', function (err) {
                if (err) return console.log(err);
              });
            }
          }
        }
      }
    });
    finished = true;
  });
});

(function wait() {
   if (!finished) {
     setTimeout(wait, 1000);
   } else {
     console.log("Finished fixing generated type paths");
   }
})();
