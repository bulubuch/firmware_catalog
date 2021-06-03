const type = require('./type')
const Task = require('./task')

// Defines the mutations
module.exports = {
	createTask: {
		type,
		args: [ 'project_id', 'object_id', 'user_id', 'name', 'description', 'type', 'action', 'repeat', 'schedule', 'status' ],
		resolve: Task.createTask.bind(Task)
	},
	updateTask: {
		type,
		args: [ 'id', 'project_id', 'object_id', 'user_id', 'name', 'description', 'type', 'action', 'repeat', 'schedule', 'status', 'created_at', 'updated_at', 'deleted_at' ],
		resolve: Task.updateTask.bind(Task)
	},
	deleteTask: {
		type: String,
		args: [ 'id' ],
		resolve: Task.deleteTask.bind(Task)
	}
}