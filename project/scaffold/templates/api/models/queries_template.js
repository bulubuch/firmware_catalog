const utils = require('../../../src/utils')

module.exports = ({name, fields}) => {
	const capi = utils.capitalize(name);
	const plural = utils.pluralize(name);

	return `const type = require('./type')
	const ${capi} = require("./${name}")
	
	// Defines the queries
	module.exports = {
		${plural}: {
			type: Array,
			args: [ ${utils.keysToCss(fields)} ],
			resolve: ${capi}.findMatching.bind(${capi})
		},
		${name}: {
			type,
			args: [ 'id' ],
			resolve: ${capi}.getByID.bind(${capi})
		}
	}`
}
