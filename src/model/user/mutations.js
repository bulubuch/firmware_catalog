const type = require('./type')
const User = require('./user')

// Defines the mutations
module.exports = {
	registerUser: {
		type,
		args: {
			first_name:			{ type: String },
			last_name:			{ type: String },
			email:				{ type: String },
			phone:				{ type: String },
			comments:			{ type: String },
			role:				{ type: String },
			status:				{ type: String }
		},
		resolve: User.registerUser.bind(User)
	},
	updateUser: {
		type,
		args: {
			id:					{ type: Number },
			first_name:			{ type: String },
			last_name:			{ type: String },
			email:				{ type: String },
			phone:				{ type: String },
			comments:			{ type: String },
			role:				{ type: String },
			status:				{ type: String }
		},
		resolve: User.updateEntry.bind(User)
	},
	deleteUser: {
		type: String,
		args: {
			id:					{ type: Number }
		},
		resolve: User.deleteUser.bind(User)
	}
}