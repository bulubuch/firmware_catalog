
module.exports = {
	name: "group",
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
		name: {
			required: true,
			name: "name",
			type: "string"
		},
		permissions: {
			name: "permissions",
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