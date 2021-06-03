const utils = require('../../../src/utils')

module.exports = (app) => {
	let includes = ""
	let uses = ""
	let model;
	for (const name in app.models) {
		model = app.models[name];
		includes += `const ${name}Routes = require('./${name}')\n`;
		uses += `\t\tapp.use('/${name}', ${name}Routes )\n`;
	}
	return `${includes}
const express = require('express')
const path = require('path');
module.exports = class Routes {
	
	/*
	 * Applies the routes to specific paths
	 * @param {*} app - The instance of express which will be serving requests.
	 */
	constructor(app) {
		//Throws if no instance of express was passed
		if (app == null) throw new Error("You must provide an instance of express")

		console.log("ROUTER INDEX");
		${uses}
	}

}`
}
