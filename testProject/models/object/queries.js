const type = require('./type')
	const Object = require("./object")
	
	// Defines the queries
	module.exports = {
		objects: {
			type: Array,
			args: [ 'id', 'project_id', 'parent_id', 'name', 'type', 'visible', 'status', 'created_at', 'updated_at', 'deleted_at' ],
			resolve: Object.findMatching.bind(Object)
		},
		object: {
			type,
			args: [ 'id' ],
			resolve: Object.getByID.bind(Object)
		}
	}