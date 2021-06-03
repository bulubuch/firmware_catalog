
const type = require('./type')
const Firmware = require("./firmware")

// Defines the queries
module.exports = {
	firmwares: {
		type: Array,
		args: {
			model_name: {
				type: String
			},
			version: {
				type: String
			},
			url: {
				type: String
			},
			status: {
				type: String
			},
			created_at: {
				type: Number
			},
			updated_at: {
				type: Number
			}
		},
		resolve: Firmware.findMatching.bind(Firmware)
	},
	firmware: {
		type,
		args: {
			id: {
				type: Number,
				required: true
			}
		},
		resolve: Firmware.getByID.bind(Firmware)
	}
}
