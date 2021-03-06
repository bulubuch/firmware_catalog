// Defines the type
module.exports = {
    name: 'Project',
    description: 'User Project',
    fields: {
        id: {
            type: Number,
			required: true,
        },
        name: {
            type: String
        },
        description: {
            type: String
        },
        shape: {
            type: String
        },
        address: {
            type: String
        },
		latitude: {
			type: Number
		},
        longitude: {
            type: Number
        },
        status: {
            type: String
        }
    }
}