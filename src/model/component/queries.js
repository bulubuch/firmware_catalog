
const type = require('./type')
const mutation = require('./mutations')
const Component = require("./component")

// Defines the queries
module.exports = {
devices: {
	type: Array,
	args: {
		name: {
			type: String
		},
		model: {
			type: String
		},
		mac: {
			type: String
		},
		firmware: {
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

	},
	resolve: Component.findMatching.bind(Component)
},
device: {
	type,
	args: {
		id: {
			type: Number
		}
	},
	resolve: Component.getByID.bind(Component)
}
}