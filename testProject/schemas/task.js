const taskQueries = require('../models/task/queries')
const taskMutations = require('../models/task/mutations')

module.exports = {
	create: taskMutations.createTask,
	delete: taskMutations.deleteTask,
	update: taskMutations.updateTask,
	search: taskQueries.tasks,
}