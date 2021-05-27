const router = require('express').Router()
const schema = require('../schema/firmware')


router.get('/', (req, res) => {
	console.log("FIRMWARE ROUTE GET");
	schema.search.resolve(res, req.query)
	.then((result) => {
		res.send(result);
	});
});

router.post('/', (req, res) => {
	console.log("FIRMWARE ROUTE POST");
	schema.upload.resolve(res, req.body)
	.then((result) => {
		res.send(result);
	});
});

router.delete('/', (req, res) => {
	console.log("FIRMWARE ROUTE DELETE");
	schema.delete.resolve(res, req.body)
	then((result) => {
		res.send(result);
	});
});

router.put('/', (req, res) => {
	console.log("FIRMWARE ROUTE PUT");
	schema.update.resolve(res, req.body)
	.then((result) => {
		res.send(result);
	});
});

module.exports = router