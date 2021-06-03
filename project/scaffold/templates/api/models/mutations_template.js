const utils = require('../../../src/utils')

module.exports = ({name, own_fields, fields}) => {
	const capi = utils.capitalize(name);
	const plural = utils.pluralize(name);

	return `const type = require('./type')
const ${capi} = require('./${name}')

// Defines the mutations
module.exports = {
	create${capi}: {
		type,
		args: [ ${utils.keysToCss(own_fields)} ],
		resolve: ${capi}.create${capi}.bind(${capi})
	},
	update${capi}: {
		type,
		args: [ ${utils.keysToCss(fields)} ],
		resolve: ${capi}.update${capi}.bind(${capi})
	},
	delete${capi}: {
		type: String,
		args: [ 'id' ],
		resolve: ${capi}.delete${capi}.bind(${capi})
	}
}`
}
