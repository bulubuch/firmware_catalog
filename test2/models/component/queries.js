const type = require('./type')
	const Component = require("./component")
	
	// Defines the queries
	module.exports = {
		components: {
			type: Array,
			args: [ 'id', 'device_id', 'model_name', 'type', 'builtin', 'status', 'created_at', 'updated_at', 'deleted_at' ],
			resolve: Component.findMatching.bind(Component)
		},
		component: {
			type,
			args: [ 'id' ],
			resolve: Component.getByID.bind(Component)
		}
	}