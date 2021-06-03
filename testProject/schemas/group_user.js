const group_userQueries = require('../models/group_user/queries')
const group_userMutations = require('../models/group_user/mutations')

module.exports = {
	create: group_userMutations.createGroup_User,
	delete: group_userMutations.deleteGroup_User,
	update: group_userMutations.updateGroup_User,
	search: group_userQueries.group_users,
}