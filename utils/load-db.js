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
 * Utility module used to load the database from the
 * CSV data downloaded from the
 * Open Grocery Database Project: http://www.grocery.com/open-grocery-database-project/
 * The data is free to download and use. From the link above:
 * "This project aims to... give everyone free and 
 * unrestricted access to simple downloadable database files containing UPC 
 * centric information about hundreds of thousands of grocery products."
 */

// For reading CSV files
const fs = require('fs');

// For reading/writing Sqlite DB
const database = require('sqlite3').verbose();

// Logger
const logger = require('../utils/logger');
//logger.setLogLevel(logger.Level.DEBUG);

// Simple utils
const utils = require('../utils/utils');

const appSettings = require('../config/app-settings');

/**
 * Loads the specified file name and returns its contents
 * in the resolved promise. If an error occurs, the Promise
 * is rejected with that err object.
 */
function loadFile(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

/**
 * Creates all of the DB fixtures.
 */
function createDbFixtures(db) {
    // return new Promise((resolve, reject) => {
    //     return new Promise((resolve, reject) => {
    //         logger.info('Dropping all tables...', 'createDbFixtures()');
    //         db.run('DROP TABLE IF EXISTS firmware');
    //         db.run('DROP TABLE IF EXISTS model');
    //         logger.info('Dropping all tables, done.', 'createDbFixtures()');
    //         resolve();
    //     }).then(() => {
    //         return loadFile(appSettings.create_sql.model);
    //     }).then((modelSql) => {
    //         logger.info('Creating model table...', 'createDbFixtures()');
    //         db.run(modelSql);
    //         logger.info('Creating model table, done.', 'createDbFixtures()');
    //         return loadFile(appSettings.create_sql.firmware);
    //     }).then((firmwareSql) => {
    //         logger.info('Creating firmware table...', 'createDbFixtures()');
    //         db.run(firmwareSql);
    //         logger.info('Creating firmware table, done.', 'createDbFixtures()')
    //         return Promise.resolve();
    //     }).catch((err) => {
    //         logger.error('Something has gone horribly wrong: ' + err.message);
    //     }).then(() => {
    //         logger.info('DONE', 'createDbFixtures()');
    //         resolve();
    //     });
    // });
	return new Promise((resolve, reject) => {
		return new Promise((resolve, reject) => {
			logger.info('Dropping all tables...', 'createDbFixtures()');
			db.run('DROP TABLE IF EXISTS firmware');
			db.run('DROP TABLE IF EXISTS device');
			db.run('DROP TABLE IF EXISTS device_component');
			db.run('DROP TABLE IF EXISTS model');
			logger.info('Dropping all tables, done.', 'createDbFixtures()');
			resolve();
		}).then(() => {
			return loadFile(appSettings.create_sql.firmware);
		}).then((firmwareSql) => {
			logger.info('Creating firmware table...', 'createDbFixtures()');
			db.run(firmwareSql);
			logger.info('Creating firmware table, done.', 'createDbFixtures()')
			return loadFile(appSettings.create_sql.model);
		}).then((modelSql) => {
			logger.info('Creating model table...', 'createDbFixtures()');
			db.run(modelSql);
			logger.info('Creating model table, done.', 'createDbFixtures()');
			return loadFile(appSettings.create_sql.device);
		}).then((deviceSql) => {
			logger.info('Creating device table...', 'createDbFixtures()');
			db.run(deviceSql);
			logger.info('Creating device table, done.', 'createDbFixtures()');
			return loadFile(appSettings.create_sql.device_component);
		}).then((deviceComponentSql) => {
			logger.info('Creating device_component table...', 'createDbFixtures()');
			db.run(deviceComponentSql);
			logger.info('Creating device_component table, done.', 'createDbFixtures()');
			return Promise.resolve();
		}).catch((err) => {
			logger.error('Something has gone horribly wrong: ' + err.message);
		}).then(() => {
			logger.info('DONE', 'createDbFixtures()');
			resolve();
		});
	});
}

/**
 * The cache of unread data. Not all data can be processed
 * for a single chunk, which is most certainly going to cross
 * record boundaries, leaving us with an incomplete record
 * at the end of the chunk. So we cache that here, then add
 * it to the front of the next chunk. And so it goes.
 */
var chunkCache = '';

/**
 * Loads the data from the database CSV files
 */
function loadData(db, fileName, handleTableRow) {
    return new Promise((resolve, reject) => {
        logger.info('Loading data files...', 'loadData()');
        // Read the model data
        const readableStream = fs.createReadStream(fileName, { highWaterMark : 64*1024 });
        readableStream.on('open', (fd) => {
            logger.info('Opened file: ' + fileName, 'loadData():readableStream.on(open)');
        }).on('data', (chunk) => {
            logger.debug('Got chunk of data (size): ' + chunk.length, 'loadData():readableStream.on(data)');
            let actualChunk = chunkCache + chunk;
            logger.debug('Passing a chunk of size (includes leftovers): ' + actualChunk.length, 'loadData()');
            let lines = utils.transformChunkIntoLines(actualChunk);
            for (let aa = 0; aa < lines.fieldsArray.length; aa++) {
                handleTableRow(db, lines.fieldsArray[aa]);
            }
            chunkCache = lines.leftOvers;
            logger.debug('Leftovers: ' + chunkCache, 'loadData()');
        }).on('error', (err) => {
            logger.error('Error: ' + err.message, 'loadData():readableStream.on(error)');
            reject(err);
        }).on('close', () => {
            logger.info('Closed file: ' + fileName, 'loadData():readableStream.on(close)');
            resolve();
        });
    });
}

/**
 * Handles model table: inserts a single row into the table
 * using the specified DB module
 */
function handleModelRowForSqlDb(db, fields) {
    // Model description
    let name = fields[1];
    // Manufacturer (optional)
    let description = (fields[2]) ? fields[2] : null;
    // Address (optional)
    let manufacturer = (fields[3]) ? fields[3] : null;
    // Website (optional)
    let datasheet = (fields[4]) ? fields[4] : null;
    // Insert the row
    db.run('INSERT INTO model (name, description, manufacturer, datasheet) VALUES (?, ?, ?, ?)', 
        name, description, manufacturer, datasheet,
        (err) => {
            if (err) {
                logger.error('Error occurred while inserting record: name = ' + 
                    name + ', description = ' + description + ', manufacturer = ' + manufacturer + ', datasheet = ' + datasheet);
            }
        });
}

/**
* Handles device table: inserts a single row into the table
* using the specified DB module and the fields provided
*/
function handleDeviceRowForSqlDb(db, fields) {
   // Model ID
   logger.error('Handling device Row for SQL'); 
   let uid = fields[1];
   // Model version
   let model_name = fields[2];
   // Firmware description
   let firmware_version = fields[3];
   // Firmware url
   let name = fields[4];
   // Insert the row
   db.run('INSERT INTO device (uid, model_name, firmware_version, name) VALUES (?, ?, ?, ?)', 
	   uid, model_name, firmware_version, name,
	   (err) => {
		   if (err) {
			   logger.error('Error occurred while inserting this record: uid = ' + uid + ', model_name = ' + model_name + ', firmware_version = ' + firmware_version + ', name = ' + name, 'db.run()');
		   }
	   });
}

/**
 * Handles firmware table: inserts a single row into the table
 * using the specified DB module and the fields provided
 */
function handleFirmwareRowForSqlDb(db, fields) {
    // Model ID
    let model_id = fields[1];
    // Model version
    let version = fields[2];
    // Firmware description
    let description = fields[3];
    // Firmware url
    let firmwareUrl = fields[4];
    // Insert the row
    db.run('INSERT INTO firmware (model_id, version, description, url) VALUES (?, ?, ?, ?)', 
        model_id, version, description, firmwareUrl,
        (err) => {
            if (err) {
                logger.error('Error occurred while inserting this record: model_id = ' + model_id + ', version = ' + version + ', description = ' + description + ', url = ' + firmwareUrl, 'db.run()');
            }
        });
}

/**
 * This is.... the mainline!
 */
(function mainline() {
    logger.info('Script start at: ' + new Date().toLocaleString(), 'mainline()');
    // Get or create the DB
    logger.info('Creating database file: ' + appSettings.db_file_name);
    let db = new database.Database(appSettings.db_file_name);
    // Create db fixtures (e.g., tables, if applicable)
    let returnPromise = createDbFixtures(db);
    returnPromise.then(() => {
		db.run('SELECT * FROM model',
        (err, rows) => {
            if (err) {
                logger.error('Error occurred while inserting this record: model_id = ' + model_id + ', version = ' + version + ', description = ' + description + ', url = ' + firmwareUrl, 'db.run()');
            } else {
                logger.info('MODEL ROWS ');
                console.log(rows);
			}
        });
        logger.info('Loading data for model...', 'mainline:createDbFixtures(resolved Promise)');
        loadData(db, appSettings.model_file_name, handleModelRowForSqlDb).then(() => {
            logger.info('Loading model data, done.', 'mainline:createDbFixtures(resolved Promise)');
            logger.info('Loading data for firmware...', 'mainline:createDbFixtures(resolved Promise)');
            loadData(db, appSettings.firmware_file_name, handleFirmwareRowForSqlDb).then(() => {
                logger.info('Loading firmware data, done.', 'mainline:createDbFixtures(resolved Promise)');
				// loadData(db, appSettings.device_file_name, handleDeviceRowForSqlDb).then(() => {
				// 	logger.info('Loading device data, done.', 'mainline:createDbFixtures(resolved Promise)');
					logger.info('Script finished at: '+ new Date().toLocaleString(), 'mainline:createDbFixtures(resolvedPromise)');
				// });
			});
        });
    }).catch((err) => {
        logger.error('Better luck next time: ' + err.message, 'mainline():createDbFixtures(rejected Promise)');
    });

    process.on('exit', (code) => {
        db.close((err) => {
            logger.error('Error closing DB: ' + err.message);
        });
    });
})();
