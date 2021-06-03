const userQueries = require('../models/user/queries')
const userMutations = require('../models/user/mutations')

module.exports = {
	create: userMutations.createUser,
	delete: userMutations.deleteUser,
	update: userMutations.updateUser,
	search: userQueries.users,
}