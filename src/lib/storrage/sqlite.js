'use strict'
const fs = require('fs');

// For reading/writing Sqlite DB
const database = require('sqlite3').verbose();

// Logger
const logger = require('./logger');
//logger.setLogLevel(logger.Level.DEBUG);

// Simple utils
const utils = require('./utils');

const appSettings = require('../../../config/app-settings');

class sqlite {
	
	static loadFile(filename) {
	   return new Promise((resolve, reject) => {
		   fs.readFile(filename, 'utf8', (err, data) => {
			   if (err) {
				   reject(err);
			   }
			   resolve(data);
		   });
	   });
	}

	static dropTables(storrages)
	/*
	* Creates all of the DB fixtures.
	*/
	static createDbFixtures(db) {
		return new Promise((resolve, reject) => {
			return new Promise((resolve, reject) => {
				logger.info('Dropping all tables...', 'createDbFixtures()');
				db.run('DROP TABLE IF EXISTS firmware');
				db.run('DROP TABLE IF EXISTS device');
				db.run('DROP TABLE IF EXISTS component');
				db.run('DROP TABLE IF EXISTS model');
				db.run('DROP TABLE IF EXISTS user');
				db.run('DROP TABLE IF EXISTS project');
				logger.info('Dropping all tables, done.', 'createDbFixtures()');
				resolve();
			}).then(() => {
				return loadFile(appSettings.create_sql.model);
			}).then((modelSql) => {
				logger.info('Creating model table...', 'createDbFixtures()');
				db.run(modelSql);
				logger.info('Creating model table, done.', 'createDbFixtures()');
				return loadFile(appSettings.create_sql.device);
			}).then((deviceSql) => {
				logger.info('Creating device table... \n' + deviceSql, 'createDbFixtures()');
				db.run(deviceSql);
				logger.info('Creating device table, done.', 'createDbFixtures()');
				return loadFile(appSettings.create_sql.component);
			}).then((deviceComponentSql) => {
				logger.info('Creating component table... \n' + deviceComponentSql, 'createDbFixtures()');
				db.run(deviceComponentSql);
				logger.info('Creating component table, done.', 'createDbFixtures()');
				return loadFile(appSettings.create_sql.user);
			}).then((userSql) => {
				logger.info('Creating user table... \n' + userSql, 'createDbFixtures()');
				db.run(userSql);
				logger.info('Creating user table, done.', 'createDbFixtures()');
				return loadFile(appSettings.create_sql.project);
			}).then((projectSql) => {
				logger.info('Creating project table... \n' + projectSql, 'createDbFixtures()');
				db.run(projectSql);
				logger.info('Creating project table, done.', 'createDbFixtures()');
				return loadFile(appSettings.create_sql.firmware);
			}).then((firmwareSql) => {
				logger.info('Creating firmware table...', 'createDbFixtures()');
				db.run(firmwareSql);
				logger.info('Creating firmware table, done.', 'createDbFixtures()')
				return Promise.resolve();
			}).catch((err) => {
				logger.error('Something has gone horribly wrong: ' + err.message);
			}).then(() => {
				logger.info('DONE', 'createDbFixtures()');
				resolve();
			});
		});
	}
	 
	 /*
	* The cache of unread data. Not all data can be processed
	* for a single chunk, which is most certainly going to cross
	* record boundaries, leaving us with an incomplete record
	* at the end of the chunk. So we cache that here, then add
	* it to the front of the next chunk. And so it goes.
	*/
	 chunkCache = '';
	 
	/*
	* Loads the data from the database CSV files
	*/
	static loadData(db, fileName, handleTableRow) {
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
	 
	/*
	* Handles model table: inserts a single row into the table
	* using the specified DB module
	*/
	static handleModelRowForSqlDb(db, fields) {
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
	 
	/*
	* Handles device table: inserts a single row into the table
	* using the specified DB module and the fields provided
	*/
	static handleDeviceRowForSqlDb(db, fields) {
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
			}
		);
	}
	 
	/*
	* Handles device table: inserts a single row into the table
	* using the specified DB module and the fields provided
	*/
	static handleDeviceComponentRowForSqlDb(db, fields) {
		// Model ID
		logger.info('Handling component Row for SQL'); 
		let device_id = fields[1];
		let model_name = fields[2];
		let type = fields[3];
		let builtin = fields[4];
		let status = fields[5];
		// Insert the row
		db.run('INSERT INTO component (device_id, model_name, type, builtin, status) VALUES (?, ?, ?, ?, ?)', 
			device_id, model_name, type, builtin, status,
			(err) => {
				if (err) {
					console.log('Error occurred while inserting this record');
				}
			}
		);
	}
	 
	 
	/*
	* Handles user table: inserts a single row into the table
	* using the specified DB module and the fields provided
	*/
	static handleUserRowForSqlDb(db, fields) {
		logger.info('Handling user Row for SQL'); 
		let first_name = fields[1];
		let last_name = fields[2];
		let email = fields[3];
		let phone = fields[4];
		let comments = fields[5];
		let role = fields[6];
		let status = fields[7];
		// Insert the row
		db.run('INSERT INTO user (first_name, last_name, email, phone, comments, role, status) VALUES (?, ?, ?, ?, ?, ?, ?)', 
			first_name, last_name, email, phone, comments, role, status,
			(err) => {
				if (err) {
					console.log('Error occurred while inserting this record');
				}
			}
		);
	}
	 
	/*
	* Handles project table: inserts a single row into the table
	* using the specified DB module and the fields provided
	*/
	static handleProjectRowForSqlDb(db, fields) {
		logger.info('Handling project Row for SQL'); 
		let user_id = fields[1];
		let name = fields[2];
		let description = fields[3];
		let shape = fields[4];
		let address = fields[5];
		let longitude = fields[6];
		let latitude = fields[7];
		let status = fields[8];
		// Insert the row
		db.run('INSERT INTO project (user_id, name, description, shape, address, longitude, latitude, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
			user_id, name, description, shape, address, longitude, latitude, status,
			(err) => {
				if (err) {
					console.log('Error occurred while inserting this record');
				}
			}
		);
	}
	 
	/*
	* Handles firmware table: inserts a single row into the table
	* using the specified DB module and the fields provided
	*/
	static handleFirmwareRowForSqlDb(db, fields) {
		// Model ID
		let model_name = fields[1];
		// Model version
		let version = fields[2];
		// Firmware description
		let description = fields[3];
		// Firmware url
		let url = fields[4];
		// Insert the row
		db.run('INSERT INTO firmware (model_name, version, description, url) VALUES (?, ?, ?, ?)', 
			model_name, version, description, url,
			(err) => {
				if (err) {
					logger.error('Error occurred while inserting this record: model_id = ' + model_id + ', version = ' + version + ', description = ' + description + ', url = ' + firmwareUrl, 'db.run()');
				}
			}
		);
	}
}


/*
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
	   logger.info('Loading data for model...', 'mainline:createDbFixtures(resolved Promise)');
	   loadData(db, appSettings.model_file_name, handleModelRowForSqlDb).then(() => {
		   logger.info('Loading model data, done.', 'mainline:createDbFixtures(resolved Promise)');
		   logger.info('Loading data for firmware...', 'mainline:createDbFixtures(resolved Promise)');
		   loadData(db, appSettings.firmware_file_name, handleFirmwareRowForSqlDb).then(() => {
			   logger.info('Loading firmware data, done.', 'mainline:createDbFixtures(resolved Promise)');
			   loadData(db, appSettings.device_file_name, handleDeviceRowForSqlDb).then(() => {
				   logger.info('Loading device data, done.', 'mainline:createDbFixtures(resolved Promise)');
				   loadData(db, appSettings.component_file_name, handleDeviceComponentRowForSqlDb).then(() => {
					   logger.info('Loading device components, done.', 'mainline:createDbFixtures(resolved Promise)');
					   loadData(db, appSettings.user_file_name, handleUserRowForSqlDb).then(() => {
						   logger.info('Loading user data, done.', 'mainline:createDbFixtures(resolved Promise)');
						   loadData(db, appSettings.project_file_name, handleProjectRowForSqlDb).then(() => {
							   logger.info('Loading project data, done.', 'mainline:createDbFixtures(resolved Promise)');
							   logger.info('Script finished at: '+ new Date().toLocaleString(), 'mainline:createDbFixtures(resolvedPromise)');
						   });
					   });
				   });
			   });
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
