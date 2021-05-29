const userQueries = require('../model/user/queries')
const userMutations = require('../model/user/mutations')

module.exports = {
	register: userMutations.registerUser,
	delete: userMutations.deleteUser,
	update: userMutations.updateUser,
	search: userQueries.users,
}