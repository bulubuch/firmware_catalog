const type = require('./type')
const Group_User = require('./group_user')

// Defines the mutations
module.exports = {
	createGroup_User: {
		type,
		args: [ 'group_id', 'user_id' ],
		resolve: Group_User.createGroup_User.bind(Group_User)
	},
	updateGroup_User: {
		type,
		args: [ 'id', 'group_id', 'user_id', 'created_at', 'updated_at', 'deleted_at' ],
		resolve: Group_User.updateGroup_User.bind(Group_User)
	},
	deleteGroup_User: {
		type: String,
		args: [ 'id' ],
		resolve: Group_User.deleteGroup_User.bind(Group_User)
	}
}