
const type = require('./type')
const Device = require("./device")

// Defines the queries
module.exports = {
	devices: {
		type: Array,
		args: {
			name: {
				type: String
			},
			model_name: {
				type: String
			},
			uid: {
				type: String
			},
			firmware: {
				type: String
			},
			created_at: {
				type: Number
			},
			updated_at: {
				type: Number
			},
			token: {
				type: String
			},

		},
		resolve: Device.findMatching.bind(Device)
	},
	device: {
		type,
		args: {
			id: {
				type: Number,
				required: true
			}
		},
		resolve: Device.getByID.bind(Device)
	},
	by_uid: {
		type,
		args: {
			uid: {
				type: Number,
				required: true
			}
		},
		resolve: Device.getByUID.bind(Device)
	}
}