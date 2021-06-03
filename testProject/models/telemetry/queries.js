const type = require('./type')
	const Telemetry = require("./telemetry")
	
	// Defines the queries
	module.exports = {
		telemetrys: {
			type: Array,
			args: [ 'id', 'device_uid', 'battery', 'air_temperature', 'air_humidity', 'air_pressure', 'soil_moisture', 'soil_temperature', 'wind_direction', 'wind_speed', 'location', 'light', 'pir', 'button', 'latch', 'created_at', 'updated_at', 'deleted_at' ],
			resolve: Telemetry.findMatching.bind(Telemetry)
		},
		telemetry: {
			type,
			args: [ 'id' ],
			resolve: Telemetry.getByID.bind(Telemetry)
		}
	}