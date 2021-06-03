
module.exports = {
	name: "object_device",
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
		object_id: {
			required: true,
			name: "object_id",
			type: "id"
		},
		device_id: {
			required: true,
			name: "device_id",
			type: "id"
		},
		visible: {
			required: true,
			name: "visible",
			type: "integer"
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