const type = require('./type')
	const User = require("./user")
	
	// Defines the queries
	module.exports = {
		users: {
			type: Array,
			args: [ 'id', 'first_name', 'last_name', 'email', 'password', 'phone', 'comments', 'role', 'status', 'created_at', 'updated_at', 'deleted_at' ],
			resolve: User.findMatching.bind(User)
		},
		user: {
			type,
			args: [ 'id' ],
			resolve: User.getByID.bind(User)
		}
	}