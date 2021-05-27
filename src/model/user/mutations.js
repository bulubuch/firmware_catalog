
const type = require('./type')
const Firmware = require('./firmware')

// Defines the mutations
module.exports = {
	uploadFirmware: {
		type,
		args: {
			model_name:			{ type: String },
			version:			{ type: Number },
			description:		{ type: String },
			url:				{ type: String },
			status:				{ type: String }
		},
		resolve: Firmware.uploadFirmware.bind(Firmware)
	},
	updateFirmware: {
		type,
		args: {
			id:					{ type: Number },
			model_name:			{ type: String },
			version:			{ type: Number },
			description:		{ type: String },
			url:				{ type: String },
			status:				{ type: String }
		},
		resolve: Firmware.updateEntry.bind(Firmware)
	},
	deleteFirmware: {
		type: String,
		args: {
			id:					{ type: Number }
		},
		resolve: Firmware.deleteFirmware.bind(Firmware)
	}
}