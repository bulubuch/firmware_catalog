const componentQueries = require('../models/component/queries')
const componentMutations = require('../models/component/mutations')

module.exports = {
	create: componentMutations.createComponent,
	delete: componentMutations.deleteComponent,
	update: componentMutations.updateComponent,
	search: componentQueries.components,
}