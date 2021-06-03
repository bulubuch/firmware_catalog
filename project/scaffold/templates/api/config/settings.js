const utils = require('../../../src/utils');

module.exports = (app) => {
	return `'use strict'

/*
** Application Settings - all relative to the project root
*/

const clients = ${utils.stringify(app.clients)};
const storrages = ${utils.stringify(app.storrages)};

const appSettings = ${utils.stringify(app.config)};

module.exports = { clients, storrages, app:appSettings };`
}