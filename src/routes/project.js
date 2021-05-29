const router = require('express').Router()
const schema = require('../schema/project')


router.get('/', (req, res) => {
	console.log("PROJECT ROUTE GET");
	schema.search.resolve(res, req.query)
	.then((result) => {
		res.send(result);
	});
});

router.post('/', (req, res) => {
	console.log("PROJECT ROUTE POST");
	schema.create.resolve(res, req.body)
	.then((result) => {
		res.send(result);
	});
});

router.delete('/', (req, res) => {
	console.log("PROJECT ROUTE DELETE");
	schema.delete.resolve(res, req.body)
	then((result) => {
		res.send(result);
	});
});

router.put('/', (req, res) => {
	console.log("PROJECT ROUTE PUT");
	schema.update.resolve(res, req.body)
	.then((result) => {
		res.send(result);
	});
});

module.exports = router