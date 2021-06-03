const router = require('express').Router()
const schema = require('../schemas/device')

router.get('/', (req, res) => {
	schema.search.resolve(res, req.query)
	.then((result) => {
		res.send(result);
	});
});

router.post('/', (req, res) => {
	schema.create.resolve(res, req.body)
	.then((result) => {
		res.status(200).send(result);
	}, (err) => {
		res.status(400).send(err);
	});
});

router.delete('/', (req, res) => {
	schema.delete.resolve(res, req.body)
	then((result) => {
		res.send(result);
	});
});

router.put('/', (req, res) => {
	schema.update.resolve(res, req.body)
	.then((result) => {
		res.send(result);
	});
});

router.get('/by_uid', (req, res) => {
	schema.by_uid.resolve(res, req.query.uid)
	.then((result) => {
		res.send(result);
	});
});

module.exports = router