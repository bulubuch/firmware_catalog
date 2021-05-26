// Defines the type
module.exports = {
    name: 'Device',
    description: 'A multi purpose device',
    fields: {
        id: {
            type: Number,
			non_null: true,
        },
        name: {
            type: String
        },
        model_name: {
            type: String
        },
        uid: {
            type: String
        },
        firmware_version: {
            type: String
        },
        sta_ssid: {
            type: String
        },
        sta_pass: {
            type: String
        },
        created_at: {
            type: Number
        },
        updated_at: {
            type: Number
        },
        token: {
            type: String
        },
    }
}