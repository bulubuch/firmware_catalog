const sql = require('./sql');
const fs = require('fs')
const api = require('./api');
const path = require('path');

let file = null;
let output_dir = '.';

if (process.argv.length > 2) {
	file = process.argv[2];
	if (process.argv.length > 3) {
		output_dir = process.argv[3];
	}
}


function error(err)
{
	if (err)
		console.log("Error: " + err);
}

function scaffoldFile(file) {
	let type = require(path.resolve(file));
	console.log("scaffold type " + type);
	sql.scaffold(type, output_dir);
	api.scaffold(type, output_dir);
	fs.copyFile(file, `${output_dir}/src/model/${type.name}/type.js`, error);
}

let dir = `${output_dir}/src`;
if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
dir = `${output_dir}/src/model`;
if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
dir = `${output_dir}/src/routes`;
if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
dir = `${output_dir}/src/schema`;
if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
dir = `${output_dir}/sql`;
if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }

scaffoldFile(file);
