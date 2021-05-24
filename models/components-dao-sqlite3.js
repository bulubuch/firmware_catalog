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
 * Sqlite3 implementation of the DAO interface for the
 * application. You should not need to make changes here.
 * If you find a bug, please open an issue.
 */

const sqlite3 = require('sqlite3').verbose();
const logger = require('../utils/logger');

const appSettings = require('../config/app-settings');

const db = require('../utils/utils').getDatabase();

function findAll() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM component';
        db.all(sql, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve({ data : JSON.stringify(row), statusCode: 200 });
            }
        });
    });
}

/**
 * Create a component with the specified values
 */
 function register(device_uid, model_name, type, builtin, active) {
    return new Promise((resolve, reject) => {
		var device_id = -1;
		var sql = `SELECT id FROM device WHERE uid = ?`;
        db.run(sql, device_uid, function callback(err, row) {
			if (err) {
				reject(err);
			} else if (row) {
				device_id = row.id;
			} else {
			}
		});
		if (device_id > 0) {
			sql = `SELECT id FROM component where device_id = ? AND model_name = ? AND type = ? AND builtin = ?`;
			db.run(sql, device_id, model_name, type, builtin, function callback(err, row) {
				if (err) {
					reject(err);
				} else if (row) {
					resolve({ data : `{ "error" : "Component already registered" }`, statusCode: 500 });
				}
			});
		}
		sql = `INSERT INTO component(device_id, model_name, type, builtin, active) VALUES(?, ?, ?, ?, ?)`
		// Run the SQL (note: must use named callback to get properties of the resulting Statement)
		db.run(sql, device_id, model_name, type, builtin, active, function callback(err) {
			if (err) {
				reject(err);
			} else {
				resolve({ data : `{ "createdId" : ${this.lastID} }`, statusCode: 201 });
			}
		});
	})
}

/**
 * Find the component for the specified id
 */
 function findById(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM component WHERE id = ?`;
        db.get(sql, id, (err, row) => {
            if (err) {
                let message = `Error reading from the database: ${err.message}`;
                logger.error(message, 'findById()');
                reject(message);
            } else if (row) {
                resolve({ data : JSON.stringify(row), statusCode: 200 });
            } else {
                resolve({ data : '{}', statusCode: 404 });
            }
        });
    });
}

/**
 * Find the component for the specified id
 */
 function findByDeviceId(device_id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM component WHERE device_id = ?`;
        db.get(sql, device_id, (err, row) => {
            if (err) {
                let message = `Error reading from the database: ${err.message}`;
                logger.error(message, 'findByDeviceId()');
                reject(message);
            } else if (row) {
                resolve({ data : JSON.stringify(row), statusCode: 200 });
            } else {
                resolve({ data : '{}', statusCode: 404 });
            }
        });
    });
}

/**
 * Find the component for the specified id
 */
 function findByType(type) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM component WHERE type = ?`;
        db.get(sql, type, (err, row) => {
            if (err) {
                let message = `Error reading from the database: ${err.message}`;
                logger.error(message, 'findByType()');
                reject(message);
            } else if (row) {
                resolve({ data : JSON.stringify(row), statusCode: 200 });
            } else {
                resolve({ data : '{}', statusCode: 404 });
            }
        });
    });
}

/**
 * Find components by the specified model_name
 */
function findByModelName(model_name) {
    return new Promise((resolve, reject) => {
		var devices;
        const sql = `SELECT * FROM component WHERE model_name = ?`;
        db.get(sql, model_name, (err, rows) => {
            if (err) {
                let message = `Error reading from the database: ${err.message}`;
                logger.error(message, 'findByManufacturer()');
                reject(message);
            } else if (rows) {
                resolve({ data : JSON.stringify(row), statusCode: 200 });
            } else {
                logger.error('Not found : ' + model_name + "in ", 'findByModelName()');
            }
        });
    });
}

/**
 * Update the component with the specified id
 * with new field values
 */
function update(id, name, firmware_version) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE component SET name = ?,  = ?, when_modified = datetime('now') WHERE id = ?`;
        // Run the SQL (note: must use named callback to get properties of the resulting Statement)
        db.run(sql, name, description, manufacturer, datasheet, id, function callback(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ data : `{ "rowsAffected" : ${this.changes} }`, statusCode: 200 });
            }
        });
    });
}

/**
 * Delete the component with the specified id
 * with new field values
 */
function del(id) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE component WHERE id = ?`;
        // Run the SQL (note: must use named callback to get properties of the resulting Statement)
        db.run(sql, id,  function callback(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ data : `{ "rowsAffected" : ${this.changes} }`, statusCode: 200 });
            }
        });
    });
}


module.exports.register = register;
module.exports.update = update;
module.exports.del = del;
module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.findByDeviceId = findByDeviceId;
module.exports.findByType = findByType;
module.exports.findByModelName = findByModelName;
