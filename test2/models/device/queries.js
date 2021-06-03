const type = require('./type')
	const Device = require("./device")
	
	// Defines the queries
	module.exports = {
		devices: {
			type: Array,
			args: [ 'id', 'uid', 'model_name', 'firmware_version', 'name', 'status', 'created_at', 'updated_at', 'deleted_at' ],
			resolve: Device.findMatching.bind(Device)
		},
		device: {
			type,
			args: [ 'id' ],
			resolve: Device.getByID.bind(Device)
		}
	}