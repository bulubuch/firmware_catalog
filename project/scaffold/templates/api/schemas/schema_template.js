const utils = require('../../../src/utils')

module.exports = (model) => {
	const name = model.name;
	const capi = utils.capitalize(model.name);
	const plural = utils.pluralize (model.name);

	return `const ${name}Queries = require('../models/${name}/queries')
const ${name}Mutations = require('../models/${name}/mutations')

module.exports = {
	create: ${name}Mutations.create${capi},
	delete: ${name}Mutations.delete${capi},
	update: ${name}Mutations.update${capi},
	search: ${name}Queries.${plural},
}`
}