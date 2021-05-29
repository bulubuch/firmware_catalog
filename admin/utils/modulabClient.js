const http = require('http');
const https = require('https');
const appSettings = require('../config/app-settings');

const options = {
	hostname: appSettings.modulabAPI_host,
	port: appSettings.modulabAPI_port
}

function get(path, params = null) {
	let opt = options;
	let count = 0;
	opt.path = path;
	if (params) {
		opt.path += '?'
		for (const [key, value] of params) {
			opt.path += `${key}=${value}`;
			if (++count < Object.keys(params).length) {
				opt.path += '&';
			}
		}
	}
	return new Promise((resolve, reject) => {
		http.get(opt, res => {
			let data = '';
			res.on('data', chunk => {
				data += chunk;
			})
	
			res.on('end', () => {
				if (res.statusCode == 200) {
					console.log("RESOLVING: " + JSON.parse(data));
					resolve(JSON.parse(data));
				} else {
					console.log("REJECTING: " + data);
					reject(data)
				}
			})
			res.on('error', err => {
				if (err) {
					console.log("Error: " + err);
					reject("Error: " + err);
				}
			});
		});

	});
}

module.exports.get = get;