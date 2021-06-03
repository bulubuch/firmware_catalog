const { required } = require('../../../project/scaffold/src/sql')
const [string, integer, double, timestamp, has_one, has_many, belongs_to_one, belongs_to_many] = require('../../lib/dataType')
// Defines the type
module.exports = {
    name: 'Device',
    description: 'A multi purpose device',
	admin_only: "D",
	storrage: {
		name: "sqlite",
		db: "user"
	},
	fields: {
        id: {
            type: 'id',
			required: true,
        },
        name: {
            type: 'string'
        },
        model_name: {
            type: 'string'
        },
        uid: {
            type: 'string'
        },
        firmware_version: {
            type: 'string'
        },
		status: {
			type: 'string'
		},
        created_at: {
           type: 'date',
			required: true,
			default: 'now'
        },
        updated_at: {
            type: 'date',
			required: true,
			default: 'now'
        },
        deleted_at: {
            type: 'date'
        },
    }
}