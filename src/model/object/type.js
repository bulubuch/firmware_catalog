// Defines the type
module.exports = {
	database: {
		type: "sqlite3",
		name: "esp_catalog.db",
		path: "data/",
		filename: "data/esp_catalog.db"
	},
	type: {
		name: 'object',
		description: 'A multi purpose generic object  ',
		fields: {
			project_id: {
				type: "id",
				unique: true,
				required: true
			},
			name: {
				type: "string",
				unique: true,
				required: true
			},
			type: {
				type: "string",
				required: true,
				default: "generic"
			},
			visible: {
				type: "integer",
				required: true,
				default: true
			},
			status: {
				type: "string",
				required: true,
				default: "new"
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
		}
	}
}