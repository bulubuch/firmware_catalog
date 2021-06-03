const objectQueries = require('../models/object/queries')
const objectMutations = require('../models/object/mutations')

module.exports = {
	create: objectMutations.createObject,
	delete: objectMutations.deleteObject,
	update: objectMutations.updateObject,
	search: objectQueries.objects,
}