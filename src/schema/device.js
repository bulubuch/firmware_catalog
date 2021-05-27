const deviceQueries = require('../model/device/queries')
const deviceMutations = require('../model/device/mutations')
const componentMutations = require('../model/component/mutations')
const componentQueries = require('../model/component/queries')

module.exports = {
	all: deviceQueries.devices,
	register: deviceMutations.registerDevice,
	delete: deviceMutations.deleteDevice,
	update: deviceMutations.updateDevice,
	search: deviceQueries.devices,
	components: deviceQueries.components,
	by_uid: deviceQueries.by_uid,
}