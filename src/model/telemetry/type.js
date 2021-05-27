// Defines the type
module.exports = {
    name: 'Firmware',
    description: 'Device firmware',
    fields: {
        id: {
            type: Number,
			non_null: true,
        },
        model_name: {
            type: String
        },
        version: {
            type: Number
        },
        description: {
            type: String
        },
        url: {
            type: String
        }
    }
}