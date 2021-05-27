const Influx = require('influx')

class influxClient {
	static _initialized;
	static _host;
	static _database;
	static _schema;
	static _db;

	static init(host, database, schema) {
		this._host = host;
		this._database = database;
		this._schema = schema;
		this._db = new Influx.InfluxDB({
			host: this._host,
			database: this._database,
			schema: this._schema		
		});
		this._db.getDatabaseNames()
		.then(names => {
			if (!names.includes(database)) {
				influx.createDatabase(database);
			}
		})
		return this._db;
	}
	static insert(measurement, tags, fields) {
		console.log("INSERTING DATA IN INFLUXDB");
		this._db.writeMeasurement(measurement, [
			{
				tags: tags,
				fields: fields
			}
		]);
	}

	static select(measurement, fields = null) {
		return new Promise((resolve, reject) => {

			console.log("SELECTING DATA IN INFLUXDB");
			let query = `SELECT * from ${measurement} WHERE `
			let keys = Object.keys(fields);
			let length = keys.length;
			for (let i = 0; i < length; i++) {
				if (fields[keys[i]]) {
					if (i) {
						query += " AND ";
					}
					query += `${keys[i]} = ${fields[keys[i]]}`;
				}
			}
			console.log(query);

			this._db.query(query)
			.then(result => {
				resolve(result);
			}).catch(err => {
				reject(err);
			});
		});
	}

	static run(query) {
		return new Promise((resolve, reject) => {

			console.log("Running INFLUXDB query");
			console.log(query);

			this._db.query(query)
			.then(result => {
				resolve(result);
			}).catch(err => {
				reject(err);
			});
		});
	}


	static findAll(measurement) {
		return new Promise((resolve, reject) => {

			console.log("SELECTING DATA IN INFLUXDB");
			let query = `SELECT * from ${measurement}`;
			this._db.query(query)
			.then(result => {
				resolve(result);
			}).catch( err => {
				reject(err);
			});
		});
	}

}
 module.exports = influxClient