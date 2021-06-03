
module.exports = {
	name: "telemetry",
	storrage: {
		name: "influx",
		db: "modulab",
		measurement: "telemetry"
	},
	fields: {
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
}