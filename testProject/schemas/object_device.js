const object_deviceQueries = require('../models/object_device/queries')
const object_deviceMutations = require('../models/object_device/mutations')

module.exports = {
	create: object_deviceMutations.createObject_Device,
	delete: object_deviceMutations.deleteObject_Device,
	update: object_deviceMutations.updateObject_Device,
	search: object_deviceQueries.object_devices,
}