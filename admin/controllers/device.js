// VIew Users
const helpers = require("../utils/helpers");
const Device = require('../models/device');

exports.view = (req, res) => {
	Device.findAll().then(result => {
		let columns = Device.columns;
		res.render('device', {
			rows: result,
			columns:columns,
			helpers
		});
	}).catch(err => {
		console.log(err);
		res.status(500).send(err);
	});
};