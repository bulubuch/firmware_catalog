const router = require('express').Router()
const schema = require('../schema/telemetry')

router.get('/', (req, res) => {
	console.log(" TELEMETRY ROUTE GET");
	console.log(req.query);
	console.log("KEYS");
	console.log(Object.keys(req.query));
	if (req.query && Object.keys(req.query).includes('where')) {
		schema.query.resolve(res, "telemetry", req.query.where)
		.then((result) => {
			res.send(result);
		}).catch(err => {
			console.log(err);
			res.send(err);
		});
	} else {
		schema.search.resolve(res, "telemetry", req.query)
		.then(result => {
			res.send(result);
		}).catch(err => {
			res.send(err);
		})
	}
});

// router.post('/', (req, res) => {
// 	console.log(" TELEMETRY ROUTE POST");
// 	schema.register.resolve(res, req.body)
// 	.then((result) => {
// 		res.send(result);
// 	});
// });

// router.delete('/', (req, res) => {
// 	console.log(" TELEMETRY ROUTE DELETE");
// 	schema.delete.resolve(res, req.body)
// 	then((result) => {
// 		res.send(result);
// 	});
// });

// router.put('/', (req, res) => {
// 	console.log(" TELEMETRY ROUTE PUT");
// 	schema.update.resolve(res, req.body)
// 	.then((result) => {
// 		res.send(result);
// 	});
// });

module.exports = router