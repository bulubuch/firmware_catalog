const { sqlConstants } = require('../utils/sqlConstants')
const db = require('../utils/utils').getDatabase();
class DAO {

    /**
     * This property can be overriden when the ID column is differet from 'id'
     */
    static get PRIMARY_KEY() {
        return "id"
    }

    /**
     * Retrieves a single entry matching the passed ID
     * @param {Number} id - The entry ID
     */
    static async find(id) {
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
     * Retrieves all entries on the extending class' table
     */
    static findAll() {
		console.log("FINDING ALL " + this.TABLE_NAME);
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM ' + this.TABLE_NAME;
			db.all(sql, this.TABLE_NAME, (err, row) => {
				if (err) {
					reject(err);
				} else {
					resolve({ data : JSON.stringify(row), statusCode: 200 });
				}
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
			const baseQuery = `SELECT * FROM ? WHERE `;
			let params = [this.TABLE_NAME]

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

			db.all(baseQuery, params, (err, rows) => {
	            if (err) {
	                reject(err);
	            } else {
	                resolve({ data : JSON.stringify(rows), statusCode: 200 });
	            }
	        });
		});
    }

    /**
     * Updates an entry
     * @param {Number} id - The ID of the entry to be updated
     * @param {Object} data - The data fields which will be updated
     */
    static update(id, data) {
		return new Promise((resolve, reject) => {
			const sql = `UPDATE ? SET ? WHERE ?? = ?`;
			let params = [this.TABLE_NAME];
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
     * Inserts a new entry
     * @param {MySQL.Connection} connection - The connection which will do the insert. It should be immediatelly released unless in a transaction
     * @param {Object} data - The fields which will populate the new entry
     */
    static insert({data}) {
		return new Promise((resolve, reject) => {
			console.log("Inserting " + this.TABLE_NAME);
			console.log(data);
			const baseQuery = `INSERT INTO ${this.TABLE_NAME} SET ?`
			const params = [];
			this.type.forEach((key, index) => {
				baseQuery += `${key} = ?`
				params.push(data[key])
				if (index + 1 !== Object.keys(data).length) baseQuery += " AND "
			})
				// Run the SQL (note: must use named callback to get properties of the resulting Statement)
			db.run(baseQuery, data, function callback(err) {
				if (err) {
					reject(err);
				} else {
					resolve({ data : `{ "createdId" : ${this.lastID} }`, statusCode: 201 });
				}
			})
		});
		return mysql.createTransactionalQuery({
            query: `INSERT INTO ${this.TABLE_NAME}
                    SET ?;`,
            params: [data],
            connection
        })
    }

    /**
     * Deletes an entry
     * @param {MySQL.Connection} connection - The connection which will do the deletion. It should be immediatelly released unless in a transaction
     * @param {Number} id - The ID of the entry to be deleted
     */
    static delete({id}) {
	    return new Promise((resolve, reject) => {
	        const sql = `DELETE FROM ? WHERE id = ?`;
	        // Run the SQL (note: must use named callback to get properties of the resulting Statement)
	        db.run(sql, this.TABLE_NAME, id,  function callback(err) {
	            if (err) {
	                reject(err);
	            } else {
	                resolve({ data : `{ "rowsAffected" : ${this.changes} }`, statusCode: 200 });
	            }
	        });
	    });
    }
}

module.exports = DAO