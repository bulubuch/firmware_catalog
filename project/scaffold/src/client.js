const utils = require('./utils');
const path = require('path');
const fs = require('fs');

function buildUrl({host, protocol, port, path}) {
	
	let res = host;
	console.log("building URL from host " + res)
	if (protocol) {
		res = `${protocol}://${res}`
	}
	if (port) {
		res = `${res}:${port}`
	}
	if (path) {
		res = `${res}/${path}`
	}
	console.log("building URL " + res)
	return res
}
module.exports = class server {
	static _clients = {};
	constructor(name, {protocol, host = "localhost", port, path, type}) {
		this.name = name;
		this.host = host;
		this.port = port;
		this.path = path;
		this.protocol = protocol;
		this.type = type;
		this.storrages = {};
		this.url = buildUrl(this);
	}
	prepare(dest_path, template_path, storrages) {
		console.log("Preparing server " + this.name)

		let dir = path.join(dest_path, 'lib', 'client');
		if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
		dir = path.join(dir, this.type + 'Client.js');
		if (!fs.existsSync(dir)) {
			let src = path.join(template_path, 'api', 'lib', 'client', this.type + 'Client.js');
			console.log(`copying ${src} to ${dir}`)
			fs.copyFile(
				src,
				dir,
				utils.error
			);
		}
		for (const name in storrages) {
			console.log("\tSearching in storrage: " + name)
			if (storrages[name].server && storrages[name].server == this.type) {
				console.log("\t\tFound in: " + name)
				this.storrages[name] = storrages[name]
			}
		}

		console.log("Preparing server " + this.name + " Done")
		console.log(this)
	}
	static prepare({storrages, clients, dest_path, template_path}) {
		console.log("Preparing clients")
		console.log(clients)
		for (const name in clients)
			if (clients[name].prepare)
				clients[name].prepare(dest_path, template_path, storrages)
		console.log("Preparing clients Done")
	}

	static  compose(clients) {
		console.log("Compose clients: " + clients)
		let res = {};
	
		if (clients)
			for (const name in clients) {
				res[name] = new server(name, clients[name]);
			}
		return res
	}
}
