
const type = require('./type')
const mutation = require('./mutations')
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
	resolve: Device.findAll.bind(Device)
},
components: {
	type: Array,
	args: {
		device_uid: {
			type: String,
			non_null: true
		},
		device_id: {
			type: Number
		},
		model_name: {
			type: String
		},
		type: {
			type: String
		}
	},
	resolve: Device.findAll.bind(Device)
},
device: {
	type,
	args: {
		id: {
			type: Number,
			non_null: true
		}
	},
	resolve: Device.getByID.bind(Device)
}
}