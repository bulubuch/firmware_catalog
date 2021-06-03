const projectQueries = require('../models/project/queries')
const projectMutations = require('../models/project/mutations')

module.exports = {
	create: projectMutations.createProject,
	delete: projectMutations.deleteProject,
	update: projectMutations.updateProject,
	search: projectQueries.projects,
}