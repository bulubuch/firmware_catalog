const router = require('express').Router()
const deviceQueries = require('../model/device/queries')
const deviceMutations = require('../model/device/mutations')
const schema = require('../schema/device')

router.get('/', (req, res) => {
	console.log(" DEVICE ROUTE GET");
	let query = schema.all.resolve(res, req.body);
	query.then((result) => {
		res.send(result);
	});
});

router.post('/', (req, res) => {
	console.log(" DEVICE ROUTE POST");
	let query = schema.register.resolve(res, req.body);
	query.then((result) => {
		res.send(result);
	});
});

router.delete('/', (req, res) => {
	console.log(" DEVICE ROUTE DELETE");
	let query = schema.delete.resolve(res, req.body);
	query.then((result) => {
		console.log(result);
		res.send(result);
	});
});

router.put('/', (req, res) => {
	console.log(" DEVICE ROUTE PUT");
	let query = schema.update.resolve(res, req.body);
	query.then((result) => {
		res.send(result);
	});
});

module.exports = router