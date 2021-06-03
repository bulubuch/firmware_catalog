
module.exports = {
	name: "task",
	storrage: {
		name: "sqlite",
		db: "project"
	},
	fields: {
		id: {
			type: "id",
			required: true,
			unique: true,
			primary: true
		},
		project_id: {
			required: true,
			name: "project_id",
			type: "id"
		},
		object_id: {
			required: true,
			name: "object_id",
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
		description: {
			name: "description",
			type: "string"
		},
		type: {
			required: true,
			name: "type",
			type: "string"
		},
		action: {
			required: true,
			name: "action",
			type: "string"
		},
		repeat: {
			required: true,
			name: "repeat",
			type: "string"
		},
		schedule: {
			required: true,
			name: "schedule",
			type: "timestamp"
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