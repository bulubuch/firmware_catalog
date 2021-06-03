const type = require('./type')
const Device = require('./device')

// Defines the mutations
module.exports = {
	createDevice: {
		type,
		args: [ 'uid', 'model_name', 'firmware_version', 'name', 'status' ],
		resolve: Device.createDevice.bind(Device)
	},
	updateDevice: {
		type,
		args: [ 'id', 'uid', 'model_name', 'firmware_version', 'name', 'status', 'created_at', 'updated_at', 'deleted_at' ],
		resolve: Device.updateDevice.bind(Device)
	},
	deleteDevice: {
		type: String,
		args: [ 'id' ],
		resolve: Device.deleteDevice.bind(Device)
	}
}