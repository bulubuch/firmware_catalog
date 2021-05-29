const modulabClient = require('../utils/modulabClient')

class Firmware {
	static get columns() {
		return [
			"id",
			"model_name",
			"version",
			"description",
			"url",
			"status"
		]
			
	}
	static findAll() {
		return modulabClient.get('/firmware/');
	}
}

module.exports = Firmware;
