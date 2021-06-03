const type = require('./type')
	const Group = require("./group")
	
	// Defines the queries
	module.exports = {
		groups: {
			type: Array,
			args: [ 'id', 'name', 'permissions', 'created_at', 'updated_at', 'deleted_at' ],
			resolve: Group.findMatching.bind(Group)
		},
		group: {
			type,
			args: [ 'id' ],
			resolve: Group.getByID.bind(Group)
		}
	}