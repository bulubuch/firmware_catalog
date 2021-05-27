const userQueries = require('../model/user/queries')
const userMutations = require('../model/user/mutations')

module.exports = {
	upload: userMutations.uploadUser,
	delete: userMutations.deleteUser,
	update: userMutations.updateUser,
	search: userQueries.users,
}