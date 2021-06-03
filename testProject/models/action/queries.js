const type = require('./type')
	const Action = require("./action")
	
	// Defines the queries
	module.exports = {
		actions: {
			type: Array,
			args: [ 'id', 'user_id', 'name', 'description', 'type', 'param', 'target_type', 'target', 'created_at', 'updated_at', 'deleted_at' ],
			resolve: Action.findMatching.bind(Action)
		},
		action: {
			type,
			args: [ 'id' ],
			resolve: Action.getByID.bind(Action)
		}
	}