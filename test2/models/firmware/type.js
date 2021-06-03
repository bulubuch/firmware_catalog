
module.exports = {
	name: "firmware",
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
		model_name: {
			required: true,
			name: "model_name",
			type: "string"
		},
		version: {
			required: true,
			name: "version",
			type: "double"
		},
		description: {
			required: true,
			name: "description",
			type: "string"
		},
		url: {
			required: true,
			name: "url",
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