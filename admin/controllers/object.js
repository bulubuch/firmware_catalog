const helpers = require("../utils/helpers");
		const Object = require('../models/object');
		
		exports.view = (req, res) => {
			Object.findAll().then(result => {
				let columns = Object.columns;
				res.render('object', {
					rows: result,
					columns:columns,
					helpers
				});
			}).catch(err => {
				console.log(err);
				res.status(500).send(err);
			});
		};