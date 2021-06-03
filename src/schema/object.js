const objectQueries = require('../model/object/queries')
		const objectMutations = require('../model/object/mutations')
		
		module.exports = {
			create: objectMutations.createObject,
			delete: objectMutations.deleteObject,
			update: objectMutations.updateObject,
			search: objectQueries.objects,
		}