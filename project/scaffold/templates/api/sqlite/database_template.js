const utils = require('../../../src/utils')
module.exports = (model) => {
	const name = model.name;
	const capi = utils.capitalize(model.name);
	const plural = utils.pluralize (model.name);
	res = `CREATE TABLE IF NOT EXISTS ${name} (\n`;

	for (const name in model.fields) {
		res += model.fields[name].sqlite;
	}
	for (const name in model.fields) {
		res += model.fields[name].sqlite;
	}
	res +=')'

	return res
}