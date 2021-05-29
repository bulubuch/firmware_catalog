
const type = require('./type')
const Project = require('./project')

// Defines the mutations
module.exports = {
	createProject: {
		type,
		args: {
			name:				{ type: String },
			description:		{ type: String },
			shape:				{ type: String },
			address:			{ type: String },
			longitude:			{ type: String },
			latitude:			{ type: String },
			status:				{ type: String }
		},
		resolve: Project.createProject.bind(Project)
	},
	updateProject: {
		type,
		args: {
			id:					{ type: Number },
			name:				{ type: String },
			description:		{ type: String },
			shape:				{ type: String },
			address:			{ type: String },
			longitude:			{ type: String },
			latitude:			{ type: String },
			status:				{ type: String }
		},
		resolve: Project.updateEntry.bind(Project)
	},
	deleteProject: {
		type: String,
		args: {
			id:					{ type: Number }
		},
		resolve: Project.deleteProject.bind(Project)
	}
}