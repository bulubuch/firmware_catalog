const influxDAO = require('../../lib/dao/influx')
const config = require('../../../config/app-settings');
const type = require('./type.js');

class Telemetry extends influxDAO {

	static db = this.getDatabase('modulab')
    /*
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'telemetry'
    }

	static get type() {
		return type
	}

    /*
     * Returns a telemetry by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /*
     * Returns a list of telemetrys matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields) {
        // Returns early with all telemetrys if no criteria was passed
        if (Object.keys(fields).length === 0) return this.findAll(this.db)
        
        // Find matching telemetrys
        return this.findByFields(db, {
            fields
        })
    }

    static async deleteTelemetry(_, id) {
        console.log("DELETED Telemetry")
        try {
            let _result = await this.delete(this.db, id)
			return _result
		} finally {
			console.log("Telemetry Deleted");
        }
    }

    /*
     * Create telemetry at first connection
     */
    static async createTelemetry(_, {id, device_uid, battery, air_temperature, air_humidity, air_pressure, soil_moisture, soil_temperature, wind_direction, wind_speed, location, light, pir, button, latch, created_at, updated_at, deleted_at}) {
        console.log("Creating Telemetry")
        try {
            let _result = await this.insert({
                data: {
	id: {
		type: "id",
		required: true,
		unique: true,
		primary: true
	},
	device_uid: {
		required: true,
		name: "device_uid",
		type: "tag"
	},
	battery: {
		name: "battery",
		type: "integer"
	},
	air_temperature: {
		name: "air_temperature",
		type: "integer"
	},
	air_humidity: {
		name: "air_humidity",
		type: "integer"
	},
	air_pressure: {
		name: "air_pressure",
		type: "integer"
	},
	soil_moisture: {
		name: "soil_moisture",
		type: "integer"
	},
	soil_temperature: {
		name: "soil_temperature",
		type: "integer"
	},
	wind_direction: {
		name: "wind_direction",
		type: "string"
	},
	wind_speed: {
		name: "wind_speed",
		type: "integer"
	},
	location: {
		name: "location",
		type: "string"
	},
	light: {
		name: "light",
		type: "integer"
	},
	pir: {
		name: "pir",
		type: "integer"
	},
	button: {
		name: "button",
		type: "integer"
	},
	latch: {
		name: "latch",
		type: "integer"
	},
	created_at: {
		type: "date",
		required: true,
		default: "now"
	},
	updated_at: {
		type: "date",
		required: true,
		default: "now"
	},
	deleted_at: {
		type: "date"
	}
}
            })
            return this.getByID(_, {id: _result})
		} finally {
			console.log("Createed telemetry");
        }
    }

    /*
     * Updates a telemetry 
     */
    static async updateTelemetry(_, {id, device_uid, battery, air_temperature, air_humidity, air_pressure, soil_moisture, soil_temperature, wind_direction, wind_speed, location, light, pir, button, latch, created_at, updated_at, deleted_at}) {
        console.log("Telemetry Update...")
        try {
            await this.update({
                id,
                data: {id, device_uid, battery, air_temperature, air_humidity, air_pressure, soil_moisture, soil_temperature, wind_direction, wind_speed, location, light, pir, button, latch, created_at, updated_at, deleted_at}
			});

            return this.getByID(_, {id})
        } finally {
			console.log("Updated telemetry");
        }
    }
}

module.exports = Telemetry