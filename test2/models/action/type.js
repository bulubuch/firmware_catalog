
module.exports = {
	name: "action",
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
		param: {
			required: true,
			name: "param",
			type: "string"
		},
		target_type: {
			required: true,
			name: "target_type",
			type: "string"
		},
		target: {
			name: "target",
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