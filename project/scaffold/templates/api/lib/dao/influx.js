const settings = require('../../config/settings')
const influx = require('../client/influxClient')

class influxDAO {
	static databases = {}
    /**
	 * This property can be overriden when the ID column is differet from 'id'
     */
	static get PRIMARY_KEY() {
		return "measurement"
    }

    /**
     * Retrieves a single entry matching the passed ID
     * @param {Number} id - The entry ID
     */
    static async find(id) {
		return new Promise((resolve, reject) => {
			resolve({})
		});
	}

	static getDatabase(name) {
		if (!(name in Object.keys(this.databases))) {
			this.databases[name] = influx.client;
		}
		return this.databases[name];
	}

    /**
     * Retrieves all entries on the extending class' table
     */
    static findAll() {
		console.log(`FINDING ALL ${this.TABLE_NAME}`);
		return new Promise((resolve, reject) => {
			let query = `SELECT * from ${this.TABLE_NAME}`
			console.log(query);

			this.db.query(query)
			.then(result => {
				resolve(result);
			}).catch(err => {
				reject(err);
			});
		});
	}

    /**
     * Find entries by their fields
     * @param {Object} fields - The fields to be matched
     * @param {Object} limit - Limits the amount of returned entries
     * @param {Object} order - Orders the returned entries using a provided field
     */
    static findByFields({fields, limit, order}) {
		return new Promise((resolve, reject) => {
			console.log("Find By Fields : ");
			console.log(fields);
			let baseQuery = `SELECT * FROM ${this.TABLE_NAME} WHERE `;
			let params = [];

	        Object.keys(fields).forEach((key, index) => {
	            baseQuery += `${key} = ?`
	            params.push(fields[key])
	            if (index + 1 !== Object.keys(fields).length) baseQuery += " AND "
	        })

	        if (order != null && order.by != null && order.direction != null) {
	            baseQuery += ` ORDER BY ??`
	            baseQuery += order.direction === "desc" ? " DESC" : " ASC"
	            params.push(order.by)
	        }

	        if (limit != null && !isNaN(limit)) {
	            baseQuery += " LIMIT ?"
	            params.push(limit)
	        }
			console.log(`SQL = ${baseQuery}`);
			console.log(`PARAMS = ${params}`);
			this.db.all(baseQuery, params, (err, rows) => {
	            if (err) {
	                reject(err);
				} else {
	                resolve(rows);
	            }
	        });
		});
    }

    /**
     * Updates an entry
     * @param {Number} id - The ID of the entry to be updated
     * @param {Object} data - The data fields which will be updated
     */
    static update({id, data}) {
		return new Promise((resolve, reject) => {

			let baseQuery = `UPDATE ${this.TABLE_NAME} SET `
			let values = ' VALUES(';
			let params = [];
			let key;
			let item = this.find(id).then((res) => {
				if (item) {
					console.log(data)
					for (let i = 0; i < Object.keys(data).length; i++) {
						key = Object.keys(data)[i];
						baseQuery += `${key} = ?`;
						if (data[key]) {
							params.push(data[key])
						} else {
							params.push(res.data[key])
						}
						baseQuery += ", "
					}
					baseQuery += ` updated_at = datetime('now') WHERE id = ${id}`;
						// Run the SQL (note: must use named callback to get properties of the resulting Statement)
					this.db.run(baseQuery, params, function callback(err) {
						if (err) {
							reject({ error : err , statusCode: 500 });
						} else {
							resolve({ insertId : this.lastID , statusCode: 201 });
						}
					})
				} else {
					reject(`${this.TABLE_NAME} with id ${id} not found.`);
				}
	
			},(err) => {
				reject(err);
			});

		});
    }

    /**
     * Inserts a new entry
     * @param {MySQL.Connection} connection - The connection which will do the insert. It should be immediatelly released unless in a transaction
     * @param {Object} data - The fields which will populate the new entry
     */
    static insert({data}) {
		return new Promise((resolve, reject) => {
			let baseQuery = `INSERT INTO ${this.TABLE_NAME}(`
			let values = ' VALUES(';
			let params = [];
			let key;

			for (let i = 0; i < Object.keys(data).length; i++) {
				key = Object.keys(data)[i];
				baseQuery += `${key}`
				values += "?"
				params.push(data[key])
				if (i + 1 !== Object.keys(data).length) {
					baseQuery += ", "
					values += ", "
				}
			}
			baseQuery += ")";
			values += ")";
			baseQuery += values;
				// Run the SQL (note: must use named callback to get properties of the resulting Statement)
			this.db.run(baseQuery, params, function callback(err) {
				if (err) {
					reject(err);
				} else {
					resolve(this.lastID);
				}
			})
		});
    }

    /**
     * Deletes an entry
     * @param {MySQL.Connection} connection - The connection which will do the deletion. It should be immediatelly released unless in a transaction
     * @param {Number} id - The ID of the entry to be deleted
     */
    static delete({id}) {
		return new Promise((resolve, reject) => {
			const sql = `DELETE FROM ${this.TABLE_NAME} WHERE id = ?`;
			// Run the SQL (note: must use named callback to get properties of the resulting Statement)
			this.db.run(sql, id,  function callback(err, row) {
				if (err) {
					reject({ error: err, statusCode: 500});
				} else {
					resolve({statusCode: 200 });
				}
			});
		});
    }
}

module.exports = influxDAO
