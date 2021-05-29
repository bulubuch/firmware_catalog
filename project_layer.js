// Defines the type
module.exports = {
    name: 'object',
    description: 'A multi generic object  ',
    fields: {
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