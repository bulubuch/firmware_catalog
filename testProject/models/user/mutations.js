const type = require('./type')
const User = require('./user')

// Defines the mutations
module.exports = {
	createUser: {
		type,
		args: [ 'first_name', 'last_name', 'email', 'password', 'phone', 'comments', 'role', 'status' ],
		resolve: User.createUser.bind(User)
	},
	updateUser: {
		type,
		args: [ 'id', 'first_name', 'last_name', 'email', 'password', 'phone', 'comments', 'role', 'status', 'created_at', 'updated_at', 'deleted_at' ],
		resolve: User.updateUser.bind(User)
	},
	deleteUser: {
		type: String,
		args: [ 'id' ],
		resolve: User.deleteUser.bind(User)
	}
}