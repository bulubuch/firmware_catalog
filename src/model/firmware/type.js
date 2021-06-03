// Defines the type
module.exports = {
    name: 'Firmware',
    description: 'Device firmware',
    fields: {
        id: {
            type: Number,
			required: true,
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