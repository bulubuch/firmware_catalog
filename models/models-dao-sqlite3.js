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
        const sql = 'SELECT * FROM model';
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
 * Create a firmware with the specified version
 */
function create(name, description, manufacturer, datasheet) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO model(name, description, manufacturer, datasheet) VALUES(?, ?, ?, ?)`
        // Run the SQL (note: must use named callback to get properties of the resulting Statement)
        db.run(sql, name, description, manufacturer, datasheet, function callback(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ data : `{ "createdId" : ${this.lastID} }`, statusCode: 201 });
            }
        })
    });
}

/**
 * Find the model for the specified id
 */
function findById(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM model WHERE id = ?`;
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
 * Find the model  for the specified id
 */
function findByManufacturer(manufacturer) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM model WHERE manufacturer like ?`;
        db.get(sql, manufacturer, (err, row) => {
            if (err) {
                let message = `Error reading from the database: ${err.message}`;
                logger.error(message, 'findByManufacturer()');
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
 * Find the model  for the specified name
 */
function findByName(name) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM model WHERE name like ?`;
        db.get(sql, name, (err, row) => {
            if (err) {
                let message = `Error reading from the database: ${err.message}`;
                logger.error(message, 'findByName()');
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
 * Update the model with the specified id
 * with new field values
 */
function update(id, name, description, manufacturer, datasheet) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE model SET name = ?, description = ?, manufacturer = ?, datasheet = ?, when_modified = datetime('now') WHERE id = ?`;
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


module.exports.findAll = findAll;
module.exports.create = create;
module.exports.findById = findById;
module.exports.findByName = findByName;
module.exports.findByManufacturer = findByManufacturer;
module.exports.update = update;
