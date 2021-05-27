const router = require('express').Router()
const schema = require('../schema/device')

router.get('/', (req, res) => {
	console.log(" DEVICE ROUTE GET");
	schema.search.resolve(res, req.query)
	.then((result) => {
		res.send(result);
	});
});

router.post('/', (req, res) => {
	console.log(" DEVICE ROUTE POST");
	schema.register.resolve(res, req.body)
	.then((result) => {
		res.send(result);
	});
});

router.delete('/', (req, res) => {
	console.log(" DEVICE ROUTE DELETE");
	schema.delete.resolve(res, req.body)
	then((result) => {
		res.send(result);
	});
});

router.put('/', (req, res) => {
	console.log(" DEVICE ROUTE PUT");
	schema.update.resolve(res, req.body)
	.then((result) => {
		res.send(result);
	});
});

router.get('/by_uid', (req, res) => {
	console.log(" DEVICE ROUTE GET PARAMS");
	console.log(req.query.uid);
	schema.by_uid.resolve(res, req.query.uid)
	.then((result) => {
		res.send(result);
	});
});

module.exports = router