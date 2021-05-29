
const type = require('./type')
const Project = require("./project")

// Defines the queries
module.exports = {
	projects: {
		type: Array,
		args: {
			name:				{ type: String },
			description:		{ type: String },
			shape:				{ type: String },
			address:			{ type: String },
			longitude:			{ type: String },
			latitude:			{ type: String },
			status:				{ type: String }
		},
		resolve: Project.findMatching.bind(Project)
	},
	project: {
		type,
		args: {
			id: {
				type: Number,
				non_null: true
			}
		},
		resolve: Project.getByID.bind(Project)
	}
}
