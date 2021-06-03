const type = require('./type')
const Group = require('./group')

// Defines the mutations
module.exports = {
	createGroup: {
		type,
		args: [ 'name', 'permissions' ],
		resolve: Group.createGroup.bind(Group)
	},
	updateGroup: {
		type,
		args: [ 'id', 'name', 'permissions', 'created_at', 'updated_at', 'deleted_at' ],
		resolve: Group.updateGroup.bind(Group)
	},
	deleteGroup: {
		type: String,
		args: [ 'id' ],
		resolve: Group.deleteGroup.bind(Group)
	}
}