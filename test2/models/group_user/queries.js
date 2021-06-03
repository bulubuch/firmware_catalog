const type = require('./type')
	const Group_User = require("./group_user")
	
	// Defines the queries
	module.exports = {
		group_users: {
			type: Array,
			args: [ 'id', 'group_id', 'user_id', 'created_at', 'updated_at', 'deleted_at' ],
			resolve: Group_User.findMatching.bind(Group_User)
		},
		group_user: {
			type,
			args: [ 'id' ],
			resolve: Group_User.getByID.bind(Group_User)
		}
	}