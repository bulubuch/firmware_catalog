const type = require('./type')
const Action = require('./action')

// Defines the mutations
module.exports = {
	createAction: {
		type,
		args: [ 'user_id', 'name', 'description', 'type', 'param', 'target_type', 'target' ],
		resolve: Action.createAction.bind(Action)
	},
	updateAction: {
		type,
		args: [ 'id', 'user_id', 'name', 'description', 'type', 'param', 'target_type', 'target', 'created_at', 'updated_at', 'deleted_at' ],
		resolve: Action.updateAction.bind(Action)
	},
	deleteAction: {
		type: String,
		args: [ 'id' ],
		resolve: Action.deleteAction.bind(Action)
	}
}