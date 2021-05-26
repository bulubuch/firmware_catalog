
const type = require('./type')
const Device = require('./device')

// Defines the mutations
module.exports = {
	registerDevice: {
		type,
		args: {
			name:				{ type: String },
			model_name:			{ type: String },
			uid:				{ type: String },
			firmware_version:	{ type: Number },
			sta_ssid: 			{ type: String },
			sta_pass: 			{ type: String }
		},
		resolve: Device.registerDevice.bind(Device)
	},
	updateDevice: {
		type,
		args: {
			id:					{ type: Number },
			name:				{ type: String },
			uid:				{ type: String },
			model_name:			{ type: String },
			firmware_version:	{ type: Number },
			sta_ssid:			{ type: String },
			sta_pass:			{ type: String },
			status:				{ type: String }
		},
		resolve: Device.updateEntry.bind(Device)
	},
	deleteDevice: {
		type: String,
		args: {
			id:					{ type: Number }
		},
		resolve: Device.deleteDevice.bind(Device)
	}
}