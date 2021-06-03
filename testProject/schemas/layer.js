const layerQueries = require('../models/layer/queries')
const layerMutations = require('../models/layer/mutations')

module.exports = {
	create: layerMutations.createLayer,
	delete: layerMutations.deleteLayer,
	update: layerMutations.updateLayer,
	search: layerQueries.layers,
}