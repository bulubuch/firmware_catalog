// Defines the type
module.exports = {
    name: 'Telemetry',
    description: 'Device telemetry',
    fields: {
        id: {
            type: Number,
			non_null: true,
        },
        device_uid: {
            type: String
        },
        measurement: {
			type: String
        },
		value: {
			type: Number
		}
    }
}