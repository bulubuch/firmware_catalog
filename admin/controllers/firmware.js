// VIew Users
const helpers = require("../utils/helpers");
const Firmware = require('../models/firmware');

exports.view = (req, res) => {
	Firmware.findAll().then(result => {
		let columns = Firmware.columns;
		console.log("VIEW FIRMWARES: " + result);
		res.render('firmware', {
			rows: result,
			columns:columns,
			helpers
		});
	}).catch(err => {
		console.log(err);
		res.status(500).send(err);
	});
};