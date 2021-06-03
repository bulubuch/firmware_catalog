const type = require('./type')
const Object = require('./object')

// Defines the mutations
module.exports = {
	createObject: {
		type,
		args: [ 'project_id', 'parent_id', 'name', 'type', 'visible', 'status' ],
		resolve: Object.createObject.bind(Object)
	},
	updateObject: {
		type,
		args: [ 'id', 'project_id', 'parent_id', 'name', 'type', 'visible', 'status', 'created_at', 'updated_at', 'deleted_at' ],
		resolve: Object.updateObject.bind(Object)
	},
	deleteObject: {
		type: String,
		args: [ 'id' ],
		resolve: Object.deleteObject.bind(Object)
	}
}