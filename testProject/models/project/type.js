
module.exports = {
	name: "project",
	storrage: {
		name: "sqlite",
		db: "project"
	},
	fields: {
		id: {
			required: true,
			name: "id",
			type: "id"
		},
		user_id: {
			required: true,
			name: "user_id",
			type: "id"
		},
		name: {
			unique: true,
			required: true,
			name: "name",
			type: "string"
		},
		type: {
			required: true,
			name: "type",
			type: "string"
		},
		visible: {
			required: true,
			name: "visible",
			type: "integer"
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