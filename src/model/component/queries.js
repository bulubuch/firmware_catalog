
const type = require('./type')
const mutation = require('./mutations')
const Component = require("./component")

// Defines the queries
module.exports = {
	components: {
		type: Array,
		args: {
			device_id: {
				type: Number
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
			}
		},
		resolve: Component.findMatching.bind(Component)
	},
	component: {
		type,
		args: {
			id: {
				type: Number
			}
		},
		resolve: Component.getByID.bind(Component)
	}
} 