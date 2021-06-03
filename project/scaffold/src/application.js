const client = require('./client');
const storrage = require('./storrage');
const utils = require('./utils');
const dataModel = require('./dataModel');
const apiT = require('../templates/api/template');
const path = require('path');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

class modul {
	template_path = path.join(__dirname, '../templates');
	default_dependencies = [
		"nodemon",
		"express",
		"node-static",
		"body-parser",
		"cors"
	]

	constructor({config, clients, storrages, models, statics, dependencies}) {
		console.log("Application constructor: ")
		this.name = config.name;
		this.type = config.type;
		this.settings = config;
		this.clients = client.compose(clients);
		this.storrages = storrage.compose(storrages);
		this.models = dataModel.compose(models);
		this.dependencies = dependencies;
		this.config = config;
		this.statics = statics;
	}

	get includes() {
		let res = "";
		let modules = []
	
		for (const storrage in this.storages) {
			if (!(storrage.name in modules)) {
				modules.push(storrage.name);
				res += `const ${storrage.type} = require('${storrage.node_module}');\n`
			}
		}
		return res
	}

	buildAPIDirStruct(dest_path) {
		let dir;
	
		console.log(`Building API Dir structure ${dest_path}`)
		if (!fs.existsSync(dest_path)){ fs.mkdirSync(dest_path); }
		dir = path.join(dest_path, 'models');
		if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
		dir = path.join(dest_path, 'config');
		if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
		dir = path.join(dest_path, 'data');
		if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
		dir = path.join(dest_path, 'data', 'database');
		if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
		// dir = path.join(dest_path, 'data', 'upload');
		// if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
		dir = path.join(dest_path, 'routes');
		if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
		dir = path.join(dest_path, 'lib');
		if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
		dir = path.join(dest_path, 'lib', 'dao');
		if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
		dir = path.join(dest_path, 'schemas');
		if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
	}
	buildDirStruct() {
		console.log(`Preparing application for scaffolding ${this.dest_path}`)
		if (this.type == 'api') {
			this.buildAPIDirStruct(this.dest_path);
		// } else if (type == 'admin') {

		}
	}

	async prepare() {
		console.log("Preparing application for scaffolding")

		await this.buildDirStruct(this.dest_path, this.type);
		await storrage.prepare(this);
		await client.prepare(this);
		await console.log("Prapation done");
	}

	
	async cd(path) {
		console.log(`Changing dir : ${path}`)
		const { stdout, stderr } = await exec(`cd ${path}`);
		console.log('stdout:', stdout);
		console.log('stderr:', stderr);
	}

	async npmInstall(module) {
		console.log(`Installing with npm : ${module}`)
		const { stdout, stderr } = await exec(`cd ${this.dest_path} & npm install -y ${module}`);
		console.log('stdout:', stdout);
		console.log('stderr:', stderr);
	}

	async installDependencies() {
		let deps = this.default_dependencies;
		let dep;
		let ready = true;

		for (dep of this.dependencies) {
			deps.push(dep)
		}
		await this.cd(this.dest_path)
		while (deps.length) {
			if (deps && ready && deps.length) {
				ready = false;
				await this.npmInstall(deps.pop())
				console.log("Installed dep")
				ready = true
			}
		}
	}

	async install() {
		console.log("Installing application");
		await this.installDependencies()
		console.log("Installation DONE");
	}

	async scaffold(dest_path) {
		this.dest_path = dest_path;
		console.log("SCAFFOLDING application to dest : " + this.dest_path);
		await this.prepare();
		for (const name in this.models)
			await this.models[name].prepare(this.storrages )
		for (const name in this.models)
			await this.models[name].scaffold(this.dest_path)
		await fs.writeFile(
			path.join(this.dest_path, 'package.json'),
			apiT.packages(this), utils.error
		);
		setTimeout(() => {
			fs.writeFile(
				path.join(this.dest_path, 'config', `settings.js`),
				apiT.config(this), utils.error
			);
		}, 500);
		setTimeout(() => {
			fs.writeFile(
				path.join(this.dest_path, `app.js`),
				apiT.app(this), utils.error
			)
		}, 1000);
		await fs.writeFile(
			path.join(this.dest_path, 'routes', 'index.js'),
			apiT.index(this), utils.error
		);
		await this.install();
		console.log("Scaffolding DONE");

	}
}

/*
**	Initialise node app with npm init
*/
		// child = exec(`cd ${dest_path}; npm init -y; cd -`,
		//     function (error, stdout, stderr) {
		//         console.log('stdout: ' + stdout);
		//         console.log('stderr: ' + stderr);
		//         if (error !== null) {
		//              console.log('exec error: ' + error);
		//         }
		//     });
		// child();
	// }
// }

module.exports.modul = modul;