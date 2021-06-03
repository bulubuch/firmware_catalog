
module.exports = {
	name: "layer",
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