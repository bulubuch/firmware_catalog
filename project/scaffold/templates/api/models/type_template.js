const utils = require('../../../src/utils')

module.exports = (model) => {
	return `
module.exports = ${model.stringify()}`
}