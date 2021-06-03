
module.exports = {
	name: "device",
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
		uid: {
			unique: true,
			required: true,
			name: "uid",
			type: "string"
		},
		model_name: {
			required: true,
			name: "model_name",
			type: "string"
		},
		firmware_version: {
			required: true,
			name: "firmware_version",
			type: "double"
		},
		name: {
			name: "name",
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