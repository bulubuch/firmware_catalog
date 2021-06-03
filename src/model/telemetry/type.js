// Defines the type
module.exports = {
    name: 'Telemetry',
    description: 'Device telemetry',
    fields: {
        id: {
            type: Number,
			required: true,
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