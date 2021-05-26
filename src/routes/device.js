const router = require('express').Router()
const deviceQueries = require('../model/device/queries')
const deviceMutations = require('../model/device/mutations')
const schema = require('../schema/device')

router.get('/', (req, res) => {
	console.log(" DEVICE ROUTE REQ");
	if (req.method == "GET") {
		res.send(schema.all.resolve(req.body));
	} else if (req.method == "POST") {
		res.send(schema.all.resolve(req.body));
	}
	// console.log(req);
});

module.exports = router