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

/**
 * This module handles all routes supported by the application.
 * You should use it as-is with no changes. If you find yourself
 * making changes to this module (unless to fix a bug, in which case
 * please log an issue), you have probably gone off the tracks
 * somewhere.
 */
// Utilities
const utils = require('../utils/utils');
// Logger
const logger = require('../utils/logger');
logger.setLogLevel(logger.Level.DEBUG);

const db = require('../utils/utils').getDatabase();

function getDevice(uid) {
	const sql = `SELECT id from device WHERE uid = ?`
	var device_id = null;
	// Run the SQL (note: must use named callback to get properties of the resulting Statement)
	db.run(sql, uid, function callback(err, row) {
		if (err) {
			return 0;
		} else if (row) {
			return device_id;
		}
	})
}


function getComponents(device_id) {
	const sql = `SELECT * FROM component WHERE device_id = ?`
	// Run the SQL (note: must use named callback to get properties of the resulting Statement)
	db.run(sql, uid, function callback(err, rows) {
		if (err) {
			return 0;
		} else if (rows) {
			return rows;
		}
	})
}

function getValue(message, key) {
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
	return result;
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
	var device_id;
	var components;

	if ((uid = getValue(message, "uid"))) {
		if ((device_id = getDevice(uid))) {
			if ((components = getComponents(device_id))) {
				for (var i = 0; i < components.length; i ++) {
					processComponent(device_id, components[i], message);
				}			
			}
		}
	}
}

// What's exported
module.exports.process = process;
