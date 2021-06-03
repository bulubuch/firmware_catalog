const actionQueries = require('../models/action/queries')
const actionMutations = require('../models/action/mutations')

module.exports = {
	create: actionMutations.createAction,
	delete: actionMutations.deleteAction,
	update: actionMutations.updateAction,
	search: actionQueries.actions,
}