const type = require('./type')
	const Object_Device = require("./object_device")
	
	// Defines the queries
	module.exports = {
		object_devices: {
			type: Array,
			args: [ 'id', 'object_id', 'device_id', 'visible', 'created_at', 'updated_at', 'deleted_at' ],
			resolve: Object_Device.findMatching.bind(Object_Device)
		},
		object_device: {
			type,
			args: [ 'id' ],
			resolve: Object_Device.getByID.bind(Object_Device)
		}
	}