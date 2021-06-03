
module.exports = {
	name: "group_user",
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
		group_id: {
			required: true,
			name: "group_id",
			type: "id"
		},
		user_id: {
			required: true,
			name: "user_id",
			type: "id"
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