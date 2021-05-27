const componentMutations = require('../model/component/mutations')
const componentQueries = require('../model/component/queries')

module.exports = {
	register: componentMutations.registerComponent,
	delete: componentMutations.deleteComponent,
	update: componentMutations.updateComponent,
	search: componentQueries.components,
}