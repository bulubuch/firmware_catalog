
module.exports = {
	name: "user",
	storrage: {
		name: "sqlite",
		db: "user"
	},
	fields: {
		id: {
			type: "id",
			required: true,
			unique: true,
			primary: true
		},
		first_name: {
			required: true,
			name: "first_name",
			type: "string"
		},
		last_name: {
			required: true,
			name: "last_name",
			type: "string"
		},
		email: {
			required: true,
			name: "email",
			type: "email"
		},
		password: {
			required: true,
			name: "password",
			type: "password"
		},
		phone: {
			name: "phone",
			type: "string"
		},
		comments: {
			name: "comments",
			type: "string"
		},
		role: {
			required: true,
			name: "role",
			type: "string"
		},
		status: {
			required: true,
			name: "status",
			type: "string"
		},
		created_at: {
			type: "date",
			required: true,
			default: "now"
		},
		updated_at: {
			type: "date",
			required: true,
			default: "now"
		},
		deleted_at: {
			type: "date"
		}
	}
}