
module.exports = {
	name: "component",
	storrage: {
		name: "sqlite",
		db: "device"
	},
	fields: {
		id: {
			type: "id",
			required: true,
			unique: true,
			primary: true
		},
		device_id: {
			required: true,
			name: "device_id",
			type: "id"
		},
		model_name: {
			required: true,
			name: "model_name",
			type: "string"
		},
		type: {
			required: true,
			name: "type",
			type: "string"
		},
		builtin: {
			required: true,
			name: "builtin",
			type: "boolean"
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