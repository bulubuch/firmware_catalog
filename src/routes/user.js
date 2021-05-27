const router = require('express').Router()
const schema = require('../schema/user')


router.get('/', (req, res) => {
	console.log("USER ROUTE GET");
	schema.search.resolve(res, req.query)
	.then((result) => {
		res.send(result);
	});
});

router.post('/', (req, res) => {
	console.log("USER ROUTE POST");
	schema.register.resolve(res, req.body)
	.then((result) => {
		res.send(result);
	});
});

router.delete('/', (req, res) => {
	console.log("USER ROUTE DELETE");
	schema.delete.resolve(res, req.body)
	then((result) => {
		res.send(result);
	});
});

router.put('/', (req, res) => {
	console.log("USER ROUTE PUT");
	schema.update.resolve(res, req.body)
	.then((result) => {
		res.send(result);
	});
});

module.exports = router