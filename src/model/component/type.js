// Defines the type
module.exports = {
    name: 'Component',
    description: 'A device component',
    fields: {
        id: {
            type: Number,
			non_null: true,
        },
        device_id: {
            type: Number,
			non_null: true,
        },
        model_name: {
            type: String
        },
        type: {
            type: String
        },
        builtin: {
            type: Number
        },
        status: {
            type: String
        },
    }
}