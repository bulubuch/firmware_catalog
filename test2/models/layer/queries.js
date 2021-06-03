const type = require('./type')
	const Layer = require("./layer")
	
	// Defines the queries
	module.exports = {
		layers: {
			type: Array,
			args: [ 'id', 'project_id', 'name', 'type', 'visible', 'status', 'created_at', 'updated_at', 'deleted_at' ],
			resolve: Layer.findMatching.bind(Layer)
		},
		layer: {
			type,
			args: [ 'id' ],
			resolve: Layer.getByID.bind(Layer)
		}
	}