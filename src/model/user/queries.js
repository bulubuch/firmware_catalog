const type = require('./type')
const User = require("./user")

// Defines the queries
module.exports = {
	users: {
		type: Array,
		args: {
			first_name:			{ type: String },
			last_name:			{ type: String },
			email:				{ type: String },
			phone:				{ type: String },
			comments:			{ type: String },
			role:				{ type: String },
			status:				{ type: String }
		},
		resolve: User.findMatching.bind(User)
	},
	user: {
		type,
		args: {
			id: {
				type: Number,
				non_null: true
			}
		},
		resolve: User.getByID.bind(User)
	}
}
