const type = require('./type')
	const Firmware = require("./firmware")
	
	// Defines the queries
	module.exports = {
		firmwares: {
			type: Array,
			args: [ 'id', 'model_name', 'version', 'description', 'url', 'status', 'created_at', 'updated_at', 'deleted_at' ],
			resolve: Firmware.findMatching.bind(Firmware)
		},
		firmware: {
			type,
			args: [ 'id' ],
			resolve: Firmware.getByID.bind(Firmware)
		}
	}