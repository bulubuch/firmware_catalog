const path = require('path');
const fs = require('fs');
const utils = require('./utils')
const apiT = require('../templates/api/template');
const { client } = require('./client');

class storrage {

	constructor(name, node_module) {
		this.name = name;
		this.node_module = node_module;
	}

	get dao() {
		return `${this.name}DAO`;
	}

	preapre() {
		console.log("Preparing STORRAGE")
	}

	create() {

	}
	read() {
		
	}
	update() {
		
	}
	delete() {
		
	}
}

class sqlite extends storrage{
	static databases = [];
	constructor(name, path) {
		super(name, 'sqlite3');
		this.type = 'sqlite';
		this.path = path;
	}

	prepare(dest_path, template_path) {
		let dir;

		console.log("Preparing SQLITE Storrage")


		dir = path.join(dest_path, 'data');
		if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
		dir = path.join(dest_path, 'data', 'database');
		if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
		dir = path.join(dest_path, 'lib');
		if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
		dir = path.join(dest_path, 'lib', 'dao');
		if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
		dir = path.join(dest_path, 'lib', 'dao', this.type + '.js');
		if (!fs.existsSync(dir)) {
			let src = path.join(template_path, 'api', 'lib', 'dao', this.type + '.js');
			console.log(`copying ${src} to ${dir}`)
			fs.copyFile(
				src,
				dir,
				utils.error
			);
		}
	}



	scaffold(dest_path, template_path) {
		// let dir = path.join(dest_path, 'data', 'database', this.name)
		// if (!fs.existsSync(dir)) {
		// 	fs.writeFile(
		// 		path.join(dir),
		// 		apiT.sqliteDao(this), utils.error
		// 	);
	
		// }

	}
}

class influx extends storrage{
	static databases = [];
	constructor(name, client) {
		super(name, 'influx');
		this.type = 'influx';
		this.schemas = [];
		this.databases = [];
		this.client = client;
	}

	prepare(dest_path, template_path, models, clients) {
		console.log("Preparing INFLUX Storrage")
		let dir;

		for (const name in models) {
			if (models[name].storrage.name == this.type) {
				if (models[name].storrage.database && models[name].storrage.database in this.databases) {
					console.log("Database already registered for scaffold")
					throw new Error("Database already registered for scaffold");
				} else {
					console.log("FOUND INFLUX MODEL")
					this.databases.push(models[name].storrage.db)
					models[name].prepare(this);
					if (clients[this.client]) {
						this.schemas.push(models[name].schema)
						this.database = models[name].storrage.db
					}
				}
			}
		}
		dir = path.join(dest_path, 'lib', 'dao');
		if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
		dir = path.join(dest_path, 'lib', 'dao', this.type + '.js');
		if (!fs.existsSync(dir)) {
			let src = path.join(template_path, 'api', 'lib', 'dao', this.type + '.js');
			console.log(`copying ${src} to ${dir}`)
			fs.copyFile(
				src,
				dir,
				utils.error
			);
		}
		console.log("Preparetion INFLUX  Storrage Done")
		console.log(this)
		console.log(utils.stringify(this))
	}
}

class ftp extends storrage{
	constructor(name, client, path) {
		super(name, 'ftp');
		this.type = 'ftp';
		this.client = client;
		this.path = path;
	}
}

class local extends storrage{
	constructor(name, path) {
		super(name, 'fs');
		this.type = 'local';
		this.path = path;
	}
	
}

function create(obj) {
	if (obj && !(obj.type == undefined)) {
		if (obj.type == 'sqlite') {
			return new sqlite(obj.name, obj.path);
		} else if (obj.type == 'influx') {
			return new influx(obj.name, obj.client);
		} else if (obj.type == 'ftp') {
			return new ftp(obj.name, obj.client, obj.path);
		} else if (obj.type == 'local') {
			return new local(obj.name, obj.path);
		} else {
			return new storrage(obj.name);
		}
	}
}

// function prepare() {
// 	for (const name in this.storrages)
// 		if (this.storrages[name].prepare)
// 			this.storrages[name].prepare(this.dest_path, this.template_path, this.models, this.clients)
// }

function prepare({storrages, dest_path, template_path, models, clients}) {
	for (const name in storrages)
		if (storrages[name].prepare)
			storrages[name].prepare(dest_path, template_path, models, clients)
}

function compose(storrages) {
	let res = {};

	for (const name in storrages) {
		res[name] = create(storrages[name]);
	}
	return res
}

module.exports.compose = compose;
module.exports.prepare = prepare;
module.exports.storrage = storrage;
module.exports.sqlite = sqlite;
module.exports.local = local;
module.exports.influx = influx;
module.exports.ftp = ftp;