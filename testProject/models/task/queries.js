const type = require('./type')
	const Task = require("./task")
	
	// Defines the queries
	module.exports = {
		tasks: {
			type: Array,
			args: [ 'id', 'project_id', 'object_id', 'user_id', 'name', 'description', 'type', 'action', 'repeat', 'schedule', 'status', 'created_at', 'updated_at', 'deleted_at' ],
			resolve: Task.findMatching.bind(Task)
		},
		task: {
			type,
			args: [ 'id' ],
			resolve: Task.getByID.bind(Task)
		}
	}