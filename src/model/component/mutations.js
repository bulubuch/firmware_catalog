
const type = require('./type')
const Component = require('./component')

// Defines the mutations
module.exports = {
	registerComponent: {
		type,
		args: {
			device_id:			{ type: Number, required: true },
			model_name:			{ type: String },
			type:				{ type: String },
			builtin: 			{ type: Number },
			status: 			{ type: String }
		},
		resolve: Component.registerComponent.bind(Component)
	},
	updateComponent: {
		type,
		args: {
			id:					{ type: Number, required: true },
			device_id:			{ type: Number },
			model_name:			{ type: String },
			type:				{ type: String },
			builtin: 			{ type: Number },
			status: 			{ type: String }
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