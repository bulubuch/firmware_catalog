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
        const sql = 'SELECT * FROM device';
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
 * Create a device with the specified values
 */
 function register(uid, name, model_name, firmware_version) {
    return new Promise((resolve, reject) => {
		var model_id = -1;
		var sql = `SELECT id FROM model WHERE name = ?`;
        db.get(sql, model_name, function callback(err, row) {
			if (err) {
				reject(err);
			} else if (row) {
				model_id = row.id;
			} else {
				sql = `INSERT INTO model(name) VALUES(?)`
				db.run(sql, model_name, function callback(err) {
					if (err) {
						reject(err);
					} else {
						model_id = this.lastID;
					}
				});
			}
		});
		sql = `SELECT id FROM firmware WHERE model_id = ? AND version = ?`;
		db.all(sql, model_id, firmware_version, function callback(err, rows) {
			if (err) {
				reject(err);
			} else if (rows) {

			} else if (model_id > 0) {
				sql = `INSERT INTO firmware(model_id, version) VALUES(?, ?)`
				db.run(sql, model_id, firmware_version, function callback(err) {
					if (err) {
						reject(err);
					}
				});
			}
		});
		sql = `INSERT INTO device(uid, name, model_name, firmware_version) VALUES(?, ?, ?, ?)`
		// Run the SQL (note: must use named callback to get properties of the resulting Statement)
		db.run(sql, uid, name, model_name, firmware_version, function callback(err) {
			if (err) {
				reject(err);
			} else {
				resolve({ data : `{ "createdId" : ${this.lastID} }`, statusCode: 201 });
			}
		});
	})
}

/**
 * Find the device for the specified id
 */
 function findById(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM device WHERE id = ?`;
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
 * Find the device for the specified uid
 */
 function findByUid(uid) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM device WHERE uid = ?`;
        db.get(sql, uid, (err, row) => {
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
 * Find devices by the specified manufacturer
 */
function findByManufacturer(manufacturer) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM model WHERE manufacturer like ?`;
		var models = [];
		var devices = [];
        db.all(sql, manufacturer, (err, rows) => {
            if (err) {
                let message = `Error reading from the database: ${err.message}`;
                logger.error(message, 'findByManufacturer()');
                reject(message);
            } else if (rows) {
				models = rows;
            } else {
                logger.error('Not found : ' + manufacturer + "in ", 'findByManufacturer()');
            }
        });
        sql = `SELECT * FROM device WHERE model_id = ?`;
		for (var i = 0; i < models.length; i++) {
			db.get(sql, manufacturer, (err, rows) => {
				if (err) {
					let message = `Error reading from the database: ${err.message}`;
					logger.error(message, 'findByManufacturer()');
					reject(message);
				} else if (rows) {
					devices.push(rows);
				}
			});
		}
		if (devices) {
			logger.info("FOUND devices", 'findByManufacturer()');
		}
    });
}

/**
 * Find the device  for the specified name
 */
function findByName(name) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM device WHERE name = ?`;
        db.all(sql, name, (err, rows) => {
            if (err) {
                let message = `Error reading from the database: ${err.message}`;
                logger.error(message, 'findByName()');
                reject(message);
            } else if (rows) {
                resolve({ data : JSON.stringify(rows), statusCode: 200 });
            } else {
                resolve({ data : '{}', statusCode: 404 });
            }
        });
    });
}

/**
 * Update the device with the specified id
 * with new field values
 */
function update(id, name, firmware_version, active) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE device SET name = ?, firmware_version = ?, active = ? when_modified = datetime('now') WHERE id = ?`;
        // Run the SQL (note: must use named callback to get properties of the resulting Statement)
        db.run(sql, name, firmware_version, active, id, function callback(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ data : `{ "rowsAffected" : ${this.changes} }`, statusCode: 200 });
            }
        });
    });
}

/**
 * Delete the device with the specified id
 * with new field values
 */
function del(id) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE device WHERE id = ?`;
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
module.exports.findByUid = findByUid;
module.exports.findByName = findByName;
module.exports.findByManufacturer = findByManufacturer;
