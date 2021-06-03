const project_objectQueries = require('../model/project_object/queries')
		const project_objectMutations = require('../model/project_object/mutations')
		
		module.exports = {
			create: project_objectMutations.createProject_object,
			delete: project_objectMutations.deleteProject_object,
			update: project_objectMutations.updateProject_object,
			search: project_objectQueries.project_objects,
		}