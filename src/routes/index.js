const userRoutes = require('./user')
const projectRoutes = require('./project')
const firmwareRoutes = require('./firmware')
const componentRoutes = require('./component')
const telemetryRoutes = require('./telemetry')
const objectRoutes = require('./object')
const deviceRoutes = require('./device')
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

		//Registers the base GraphQLi base endpoint
		// app.use(fileUpload())
		// app.post('/upload', function(req, res) {
		// 	console.log("POST upload");
		// 	console.log(req);
		// 	if (!req.files || Object.keys(req.files).length === 0) {
		// 	  return res.status(400).send('No files were uploaded.');
		// 	}
		  
		// 	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
		// 	let file = req.files.file;
		  
		// 	// Use the mv() method to place the file somewhere on your server
		// 	file.mv('./firmware/fw.bin', function(err) {
		// 		if (err)
		// 			return res.status(500).send(err);
		  
		// 		res.send('File uploaded!');
		// 	});
		// });

		console.log("ROUTER INDEX");
		app.use(express.static(path.join('public')))
		app.use('/user', userRoutes)
		app.use('/project', projectRoutes)
		app.use('/device', deviceRoutes )
		app.use('/firmware', firmwareRoutes )
		app.use('/component', componentRoutes )
		app.use('/telemetry', telemetryRoutes )
		app.use('/object', objectRoutes )
		// SCAFFOLD_PLACEHOLDER
	}

}