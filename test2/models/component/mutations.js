const type = require('./type')
const Component = require('./component')

// Defines the mutations
module.exports = {
	createComponent: {
		type,
		args: [ 'device_id', 'model_name', 'type', 'builtin', 'status' ],
		resolve: Component.createComponent.bind(Component)
	},
	updateComponent: {
		type,
		args: [ 'id', 'device_id', 'model_name', 'type', 'builtin', 'status', 'created_at', 'updated_at', 'deleted_at' ],
		resolve: Component.updateComponent.bind(Component)
	},
	deleteComponent: {
		type: String,
		args: [ 'id' ],
		resolve: Component.deleteComponent.bind(Component)
	}
}