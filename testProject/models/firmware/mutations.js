const type = require('./type')
const Firmware = require('./firmware')

// Defines the mutations
module.exports = {
	createFirmware: {
		type,
		args: [ 'model_name', 'version', 'description', 'url', 'status' ],
		resolve: Firmware.createFirmware.bind(Firmware)
	},
	updateFirmware: {
		type,
		args: [ 'id', 'model_name', 'version', 'description', 'url', 'status', 'created_at', 'updated_at', 'deleted_at' ],
		resolve: Firmware.updateFirmware.bind(Firmware)
	},
	deleteFirmware: {
		type: String,
		args: [ 'id' ],
		resolve: Firmware.deleteFirmware.bind(Firmware)
	}
}