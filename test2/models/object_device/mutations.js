const type = require('./type')
const Object_Device = require('./object_device')

// Defines the mutations
module.exports = {
	createObject_Device: {
		type,
		args: [ 'object_id', 'device_id', 'visible' ],
		resolve: Object_Device.createObject_Device.bind(Object_Device)
	},
	updateObject_Device: {
		type,
		args: [ 'id', 'object_id', 'device_id', 'visible', 'created_at', 'updated_at', 'deleted_at' ],
		resolve: Object_Device.updateObject_Device.bind(Object_Device)
	},
	deleteObject_Device: {
		type: String,
		args: [ 'id' ],
		resolve: Object_Device.deleteObject_Device.bind(Object_Device)
	}
}