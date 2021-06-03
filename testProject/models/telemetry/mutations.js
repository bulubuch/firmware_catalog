const type = require('./type')
const Telemetry = require('./telemetry')

// Defines the mutations
module.exports = {
	createTelemetry: {
		type,
		args: [ 'device_uid', 'battery', 'air_temperature', 'air_humidity', 'air_pressure', 'soil_moisture', 'soil_temperature', 'wind_direction', 'wind_speed', 'location', 'light', 'pir', 'button', 'latch' ],
		resolve: Telemetry.createTelemetry.bind(Telemetry)
	},
	updateTelemetry: {
		type,
		args: [ 'id', 'device_uid', 'battery', 'air_temperature', 'air_humidity', 'air_pressure', 'soil_moisture', 'soil_temperature', 'wind_direction', 'wind_speed', 'location', 'light', 'pir', 'button', 'latch', 'created_at', 'updated_at', 'deleted_at' ],
		resolve: Telemetry.updateTelemetry.bind(Telemetry)
	},
	deleteTelemetry: {
		type: String,
		args: [ 'id' ],
		resolve: Telemetry.deleteTelemetry.bind(Telemetry)
	}
}