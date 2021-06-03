const groupQueries = require('../models/group/queries')
const groupMutations = require('../models/group/mutations')

module.exports = {
	create: groupMutations.createGroup,
	delete: groupMutations.deleteGroup,
	update: groupMutations.updateGroup,
	search: groupQueries.groups,
}