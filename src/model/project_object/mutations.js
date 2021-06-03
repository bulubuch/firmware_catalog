
		const type = require('./type')
		const Project_object = require('./project_object')
		
		// Defines the mutations
		module.exports = {
			createProject_object: {
				type,
				args: {
					project_id: {type:"id", unique: true, required: true, default: undefined},
			name: {type:"string", unique: true, required: true, default: undefined},
			type: {type:"string", required: true, default: "generic"},
			visible: {type:"integer", required: true, default: true},
			status: {type:"string", required: true, default: "new"},
			created_at: {type:"date", required: true, default: "now"},
			updated_at: {type:"date", required: true, default: "now"}
				},
				resolve: Project_object.createProject_object.bind(Project_object)
			},
			updateProject_object: {
				type,
				args: {
					project_id: {type:"id", unique: true, required: true, default: undefined},
			name: {type:"string", unique: true, required: true, default: undefined},
			type: {type:"string", required: true, default: "generic"},
			visible: {type:"integer", required: true, default: true},
			status: {type:"string", required: true, default: "new"},
			created_at: {type:"date", required: true, default: "now"},
			updated_at: {type:"date", required: true, default: "now"}
				},
				resolve: Project_object.updateProject_object.bind(Project_object)
			},
			deleteProject_object: {
				type: String,
				args: {
					id:					{ type: Number }
				},
				resolve: Project_object.deleteProject_object.bind(Project_object)
			}
		}