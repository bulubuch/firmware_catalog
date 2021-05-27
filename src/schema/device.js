const deviceQueries = require('../model/device/queries')
const deviceMutations = require('../model/device/mutations')

module.exports = {
	register: deviceMutations.registerDevice,
	delete: deviceMutations.deleteDevice,
	update: deviceMutations.updateDevice,
	search: deviceQueries.devices,
}