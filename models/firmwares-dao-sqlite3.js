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

/**
 * All of the SELECTs in this module look the same
 */
const SELECT = `SELECT firmware.id as firmware_id,
    firmware.description as firmware_description,
    firmware.version, 
    firmware.url, 
    firmware.when_created, 
    model.id as model_id, 
    model.name as model,
    model.description as model_description, 
    model.manufacturer as model_manufacturer, 
    model.datasheet`;

function findAll() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM firmware';
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
 * All of the FROMs in this module look the same
 */
const FROM = `FROM firmware JOIN model ON firmware.model_id = model.id`;

/**
 * Create a firmware with the specified version
 */
function create(model_id, version, description, url) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO firmware(model_id, version, description, url) VALUES(?, ?, ?, ?)`
        // Run the SQL (note: must use named callback to get properties of the resulting Statement)
        db.run(sql, model_id, version, description, url, function callback(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ data : `{ "createdId" : ${this.lastID} }`, statusCode: 201 });
            }
        })
    });
}

/**
 * Update the firmware with the specified id
 * with new field values
 */
function update(id, model_id, version, description, url) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE firmware SET model_id = ?, version = ?, description = ?, url = ?,  when_modified = datetime('now') WHERE id = ?`;
        // Run the SQL (note: must use named callback to get properties of the resulting Statement)
        db.run(sql, model_id, version, description, url, id,  function callback(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ data : `{ "rowsAffected" : ${this.changes} }`, statusCode: 200 });
            }
        });
    });
}

/**
 * Delete the firmware with the specified id
 * with new field values
 */
function del(id) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE firmware WHERE id = ?`;
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

/**
 * Find by Id - sqlite3 implementation
 */
function findById(id) {
    logger.debug(`Reading item with id = ${id}`, 'findById()');
    return new Promise((resolve, reject) => {
        let sql = `${SELECT} ${FROM} WHERE firmware.id = ?`;
        db.get(sql, id, (err, row) => {
            if (err) {
                let message = `Error reading from the database: ${err.message}`;
                logger.error(message, 'findById()');
                reject(message);
            } else if (row) {
                resolve({ data : JSON.stringify(row), statusCode: 200 });
            } else {
                resolve({ data : JSON.stringify({}), statusCode: 404 });
            }
        });
    });
}

/**
 * Find all by version - sqlite3 implementation
 */
function findByVersion(version) {
    return new Promise((resolve, reject) => {
        let sql = `${SELECT} ${FROM} WHERE firmware.version = ?`;
        db.all(sql, [`%${version}%`], (err, rows) => {
            if (err) {
                let message = `Error reading from the database: ${err.message}`;
                logger.error(message, 'findByVersion()');
                reject(message);
            } else {
                resolve({ data : JSON.stringify(rows), statusCode: (rows.length > 0) ? 200 : 404 });
            }
        });
    });
}

/**
 * Find all by partial description - sqlite3 implementation
 */
function findByDescription(partialDescription) {
    return new Promise((resolve, reject) => {
        let sql = `${SELECT} ${FROM} WHERE firmware.description like ?`;
        db.all(sql, [`%${partialDescription}%`], (err, rows) => {
            if (err) {
                let message = `Error reading from the database: ${err.message}`;
                logger.error(message, 'findByDescription()');
                reject(message);
            } else {
                resolve({ data : JSON.stringify(rows), statusCode: (rows.length > 0) ? 200 : 404 });
            }
        });
    });
}

/**
 * Find by Model name - sqlite3 implementation
 */
function findByModelName(modelName) {
    return new Promise((resolve, reject) => {
        let sql = `${SELECT} ${FROM} WHERE firmware.model = ?`;
        db.get(sql, modelName, (err, rows) => {
            if (err) {
                let message = `Error reading from the database: ${err.message}`;
                logger.error(message, 'findByModelName()');
                reject(message);
            } else {
                resolve({ data : JSON.stringify(rows), statusCode: (rows.length > 0) ? 200 : 404 });
            }
        });
    });
}

/**
 * Find new version - sqlite3 implementation
 */
function findNewVersion(modelName, actualVersion) {
    return new Promise((resolve, reject) => {
        let sql = `${SELECT} ${FROM} WHERE model = ?, version > ?`;
        db.get(sql, modelName, actualVersion, (err, rows) => {
            if (err) {
                let message = `Error reading from the database: ${err.message}`;
                logger.error(message, 'findNewVersion()');, actualVersion
                reject(message);
            } else {
                let next = rows[0];
                rows.forEach(element => {
                    if (element.version > next.version) {
                        next = element;
                    }
                });
                resolve({ data : JSON.stringify(next), statusCode: 200});
            }
        });
    });
}

module.exports.create = create;
module.exports.update = update;
module.exports.del = del;
module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.findByDescription = findByDescription;
module.exports.findByModelName = findByModelName;
module.exports.findByVersion = findByVersion;
module.exports.findNewVersion = findNewVersion;
