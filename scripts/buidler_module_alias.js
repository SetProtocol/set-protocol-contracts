const moduleAlias = require('module-alias')
require('dotenv').config({ path: './.env'});

//
// Register alias
//
console.log(process.env.IS_BUIDLER);
if (process.env.IS_BUIDLER === 'true') {
	moduleAlias.addAlias('@utils', __dirname + '/utils')
} else {
	moduleAlias.addAlias('@utils', __dirname + '/transpiled/utils')
}	

// Could also copy tests to transpiled