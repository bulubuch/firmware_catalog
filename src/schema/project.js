const projectQueries = require('../model/project/queries')
const projectMutations = require('../model/project/mutations')

module.exports = {
	create: projectMutations.createProject,
	delete: projectMutations.deleteProject,
	update: projectMutations.updateProject,
	search: projectQueries.projects,
}