const config = require('../../../config/app-settings');
const influxClient = require('../../lib/influxclient');
const type = require('./type.js');

class Telemetry {

    /**
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'firmware'
    }

	static get type() {
		return type
	}

    /**
     * Returns a model by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /**
     * Returns a list of measurement matching the passed fields
     * @param {*} fields - Fields to be matched
     */
	 static async query(_, measurement, where) {
		console.log("INFLUX QUERY");
        // Returns early with all measurement if no criteria was passed
        if (where.length === 0) return influxClient.findAll(measurement);
		let query = `SELECT * FROM ${measurement} WHERE ${where}`;
        // Find matching measurement
		return influxClient.run(query);
	}

    /**
     * Returns a list of measurement matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, measurement, fields) {
        // Returns early with all measurement if no criteria was passed
        if (Object.keys(fields).length === 0) return await influxClient.findAll(measurement)
        // Find matching measurement
		return await influxClient.select(measurement, fields);
	}

    static async deleteTelemetry(_, {id}) {
        console.log("DELETED Telemetry")
        try {
            let _result = await this.delete(id)
			return _result
		} catch(err) {
			return err
		} finally {
			console.log("Telemetry Deleted");
        }
    }

    /**
     * Uploads a new firmware
     */
    static async uploadTelemetry(_, {model_name, version, description, url, status}) {
        console.log("Upload Telemetry")
        try {
            let _result = await this.insert({
                data: {
					model_name,
					version,
					description,
					url,
					status
                }
            })
            return this.getByID(_, {id: _result.insertId})
        } catch (err) {
			return (err)
		} finally {
			console.log("Registered device");
        }
    }
	
    /**
     * Updates a firmware 
     */
	 static async updateEntry(_, {id, model_name, version, description, url, status}) {
        console.log("Telemetry Update...")
        try {
            await this.update({
                id,
                data: {
                    model_name,
                    version,
                    description,
                    url,
					status
                }
			});

            return this.getByID(_, {id})
		} catch (err) {
			console.log(err);
			return (err);
        } finally {
			console.log("Updated device");
        }
    }
}

module.exports = Telemetry