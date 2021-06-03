const deviceQueries = require('../models/device/queries')
const deviceMutations = require('../models/device/mutations')

module.exports = {
	create: deviceMutations.createDevice,
	delete: deviceMutations.deleteDevice,
	update: deviceMutations.updateDevice,
	search: deviceQueries.devices,
}