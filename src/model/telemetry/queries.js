
const type = require('./type')
const Telemetry = require("./telemetry")

// Defines the queries
module.exports = {
	measurements: {
		type: Array,
		args: {
			name: {
				type: String
			},
			device_id: {
				type: Number
			},
			device_uid: {
				type: String
			},
			device_type: {
				type: String
			},
			component_type: {
				type: String
			},
			device_model: {
				type: String
			},
			component_model: {
				type: String
			},
			value: {
				type: Number
			},
			range: {
				type: Number
			}
		},
		resolve: Telemetry.findMatching.bind(Telemetry)
	},
	measurement: {
		type,
		args: {
			id: {
				type: Number,
				non_null: true
			}
		},
		resolve: Telemetry.getByID.bind(Telemetry)
	}
}
