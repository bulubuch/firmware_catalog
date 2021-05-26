const deviceQueries = require('../model/device/queries')
const deviceMutations = require('../model/device/mutations')
const componentMutations = require('../model/component/mutations')
const componentQueries = require('../model/component/queries')

module.exports = {
	register: deviceMutations.registerDevice,
	components: deviceQueries.components,
	search: deviceQueries.devices,
	all: deviceQueries.devices,
	by_uid: deviceQueries.by_uid,
}