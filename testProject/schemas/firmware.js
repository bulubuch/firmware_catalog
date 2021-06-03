const firmwareQueries = require('../models/firmware/queries')
const firmwareMutations = require('../models/firmware/mutations')

module.exports = {
	create: firmwareMutations.createFirmware,
	delete: firmwareMutations.deleteFirmware,
	update: firmwareMutations.updateFirmware,
	search: firmwareQueries.firmwares,
}