// Defines the type
module.exports = {
    name: 'Component',
    description: 'A device component',
    fields: {
        id: {
            type: Number,
			required: true,
        },
        device_id: {
            type: Number,
			required: true,
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