const modulabClient = require('../utils/modulabClient')

class Device {
	static get columns() {
		return [
			"id",
			"uid",
			"name",
			"model_name",
			"firmware_version",
			"status"
		]
			
	}
	static findAll() {
		return modulabClient.get('/device');
	}
}

module.exports = Device;
