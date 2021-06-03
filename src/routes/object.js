const router = require('express').Router()
		const schema = require('../schema/object')
		
		
		router.get('/', (req, res) => {
			schema.search.resolve(res, req.query)
			.then((result) => {
				res.send(result);
			});
		});
		
		router.post('/', (req, res) => {
			schema.create.resolve(res, req.body)
			.then((result) => {
				res.send(result);
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
		
		module.exports = router