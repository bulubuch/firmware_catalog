const type = require('./type')
const Layer = require('./layer')

// Defines the mutations
module.exports = {
	createLayer: {
		type,
		args: [ 'project_id', 'name', 'type', 'visible', 'status' ],
		resolve: Layer.createLayer.bind(Layer)
	},
	updateLayer: {
		type,
		args: [ 'id', 'project_id', 'name', 'type', 'visible', 'status', 'created_at', 'updated_at', 'deleted_at' ],
		resolve: Layer.updateLayer.bind(Layer)
	},
	deleteLayer: {
		type: String,
		args: [ 'id' ],
		resolve: Layer.deleteLayer.bind(Layer)
	}
}