// Defines the type
module.exports = {
    name: 'User',
    description: 'User profile',
    fields: {
        id: {
            type: Number,
			non_null: true,
        },
        first_name: {
            type: String
        },
        last_name: {
            type: String
        },
        email: {
            type: String
        },
        phone: {
            type: String
        },
        comments: {
            type: String
        },
        status: {
            type: String
        },
        role: {
            type: String
        }
    }
}