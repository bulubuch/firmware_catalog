const type = require('./type')
const Project = require('./project')

// Defines the mutations
module.exports = {
	createProject: {
		type,
		args: [ 'id', 'user_id', 'name', 'type', 'visible', 'status' ],
		resolve: Project.createProject.bind(Project)
	},
	updateProject: {
		type,
		args: [ 'id', 'user_id', 'name', 'type', 'visible', 'status', 'created_at', 'updated_at', 'deleted_at' ],
		resolve: Project.updateProject.bind(Project)
	},
	deleteProject: {
		type: String,
		args: [ 'id' ],
		resolve: Project.deleteProject.bind(Project)
	}
}