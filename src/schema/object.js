const objectQueries = require('../model/object/queries')
		const objectMutations = require('../model/object/mutations')
		
		module.exports = {
			create: objectMutations.create_Object,
			delete: objectMutations.delete_Object,
			update: objectMutations.update_Object,
			search: objectQueries.search_Object,
		}