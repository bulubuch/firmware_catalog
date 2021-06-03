const type = require('./type')
	const Project = require("./project")
	
	// Defines the queries
	module.exports = {
		projects: {
			type: Array,
			args: [ 'id', 'user_id', 'name', 'type', 'visible', 'status', 'created_at', 'updated_at', 'deleted_at' ],
			resolve: Project.findMatching.bind(Project)
		},
		project: {
			type,
			args: [ 'id' ],
			resolve: Project.getByID.bind(Project)
		}
	}