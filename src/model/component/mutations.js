
const type = require('./type')
const Component = require('./component')

// Defines the mutations
module.exports = {
	registerComponent: {
		type,
		args: {
			name:				{ type: String },
			model_name:			{ type: String },
			uid:				{ type: String },
			firmware_version:	{ type: Number },
			sta_ssid: 			{ type: String },
			sta_pass: 			{ type: String }
		},
		resolve: Component.registerComponent.bind(Component)
	},
	updateComponent: {
		type,
		args: {
			id:					{ type: Number },
			name:				{ type: String },
			uid:				{ type: String },
			model_name:			{ type: String },
			firmware_version:	{ type: Number },
			sta_ssid:			{ type: String },
			sta_pass:			{ type: String },
			status:				{ type: String }
		},
		resolve: Component.updateEntry.bind(Component)
	},
	deleteComponent: {
		type: String,
		args: {
			id:					{ type: Number }
		},
		resolve: Component.deleteComponent.bind(Component)
	}
}