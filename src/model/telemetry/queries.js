
const type = require('./type')
const Telemetry = require("./telemetry")

// Defines the queries
module.exports = {
	query: {
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
			device_model_name: {
				type: String
			},
			component_model_name: {
				type: String
			},
			value: {
				type: Number
			},
			range: {
				type: Number
			}
		},
		resolve: Telemetry.query.bind(Telemetry)
	},
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
			device_model_name: {
				type: String
			},
			component_model_name: {
				type: String
			}
		},
		resolve: Telemetry.findMatching.bind(Telemetry)
	},
}
