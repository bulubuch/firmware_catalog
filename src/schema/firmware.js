const firmwareQueries = require('../model/firmware/queries')
const firmwareMutations = require('../model/firmware/mutations')

module.exports = {
	upload: firmwareMutations.uploadFirmware,
	delete: firmwareMutations.deleteFirmware,
	update: firmwareMutations.updateFirmware,
	search: firmwareQueries.firmwares,
}