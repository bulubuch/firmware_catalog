const userRoutes = require('./user')
const groupRoutes = require('./group')
const group_userRoutes = require('./group_user')
const projectRoutes = require('./project')
const objectRoutes = require('./object')
const layerRoutes = require('./layer')
const object_deviceRoutes = require('./object_device')
const actionRoutes = require('./action')
const taskRoutes = require('./task')
const deviceRoutes = require('./device')
const componentRoutes = require('./component')
const firmwareRoutes = require('./firmware')
const telemetryRoutes = require('./telemetry')

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
				app.use('/user', userRoutes )
		app.use('/group', groupRoutes )
		app.use('/group_user', group_userRoutes )
		app.use('/project', projectRoutes )
		app.use('/object', objectRoutes )
		app.use('/layer', layerRoutes )
		app.use('/object_device', object_deviceRoutes )
		app.use('/action', actionRoutes )
		app.use('/task', taskRoutes )
		app.use('/device', deviceRoutes )
		app.use('/component', componentRoutes )
		app.use('/firmware', firmwareRoutes )
		app.use('/telemetry', telemetryRoutes )

	}

}