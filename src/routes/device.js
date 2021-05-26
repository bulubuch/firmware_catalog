const router = require('express').Router()
const deviceQueries = require('../model/device/queries')
const deviceMutations = require('../model/device/mutations')
const schema = require('../schema/device')

router.get('/', (req, res) => {
	console.log(" DEVICE ROUTE REQ");
	res.send(schema.all.resolve());
});

router.post('/', (req, res) => {
	console.log(" DEVICE ROUTE REQ");
	console.log(req.body);
	res.send(schema.register.resolve(req.body));
});

module.exports = router