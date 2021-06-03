const type = require('./type')
		const Object = require("./object")
		
		// Defines the queries
		module.exports = {
			objects: {
				type: Array,
				args: {
					project_id: {type:"id", unique: true, required: true, default: undefined},
			name: {type:"string", unique: true, required: true, default: undefined},
			type: {type:"string", required: true, default: "generic"},
			visible: {type:"integer", required: true, default: true},
			status: {type:"string", required: true, default: "new"},
			created_at: {type:"date", required: true, default: "now"},
			updated_at: {type:"date", required: true, default: "now"}
				},
				resolve: Object.findMatching.bind(Object)
			},
			object: {
				type,
				args: {
					id: {
						type: Number,
						required: true
					}
				},
				resolve: Object.getByID.bind(Object)
			}
		}