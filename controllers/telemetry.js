/*
   Copyright 2018 Makoto Consulting Group, Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
'use strict'

// Node HTTP & HTTPS module
const http = require('http');
const https = require('https')

// Utilities
const utils = require('../utils/utils');
// Logger
const logger = require('../utils/logger');
logger.setLogLevel(logger.Level.DEBUG);

function apiGet(path) {
	return new Promise((resolve, reject) => {
		var options = {
			hostname: 'localhost',
			port: 8000,
			path: path,
			method: 'GET'
		}
		var res = null;
		console.log("API get path : " + path);
		const req = http.request(options, res => {
			console.log(`statusCode: ${res.statusCode}`);
			res.on('data', d => {
				console.log("Getting data...");
				res = JSON.parse(d);
				console.log(res);
				resolve(res);
			})
		});
		req.on('error', error => {
			console.log(error);
			reject(error);
		});
		req.end();
	});
}

function getValue(message, key) {
	console.log("GET value of " + key + " in message : " + message);
	var parts = message.split(",");
	var n = -1;
	var result = null;
	for (var i = 0; i < parts.length; i++) {
		n = message.search(key + "=");
		if (n == 0) {
			result = message.slice(key.length + 1);
			break;
		}
	}
	console.log("Found : " + result);
	return result;
}


function getMessageUid(message) {
	var str = "" + message;
	var parts = str.split(",");
	console.log("GET UID in message : " + message);
	if (parts.length > 1) {
		console.log("Parts " + parts.length);
		console.log("UID: " + parts[0]);
		return parts[0];
	}
	return null;
}


function processComponent(device_id, component, message) {
	var result;
	var value;

	value = getValue(message, component.type)
	if (value != null) {
		result = component.type + ",";
		result += "device_id=" + device_id;
		result += ",value=" + value;
		console.log("Processes component ");
		console.log(component);
	} else {
		console.log("Telemetry for not registered component.");
	}
}

/**
 * Process telemetry message from mqtt telemetry topic
 */
function process(message) {
	var uid;
	var device;
	var components;

	console.log("Processing message:");
	if ((uid = getMessageUid(message))) {
		console.log("GETTING DEVICE:");
		device = apiGet("/devices/by_uid/" + uid);
		console.log("GOT:");
		console.log(device);
		if (device) {
		console.log("GETTING COMPONENTS:");
		components = apiGet("/devices/components/" + device.id);
			if (components) {
				for (var i = 0; i < components.length; i ++) {
					processComponent(device_id, components[i], message);
				}			
			}
		}
	}
}

// What's exported
module.exports.process = process;
