const express = require('express');
const Routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const settings = require('./config/settings');
const sqliteClient = require('./lib/client/sqliteClient.js')
const influxClient = require('./lib/client/influxClient.js')
const mqttClient = require('./lib/client/mqttClient.js')


class App {
    
    /*
     * 
     * 
     * Sets the properties to be used by this class to create the server
     * 
     */
    constructor() {
        this.expressApp = express()
        //Literal object containing the configurations
        this.configs = {
            get port() {
                return process.env.PORT || settings.app.port
            }
        }
		console.log(settings)
		sqliteClient.init(settings.clients['sqlite'])
influxClient.init(settings.clients['influx'])
mqttClient.init(settings.clients['mqtt'])

    }

	connectToServers() {
		for (const name in this.servers) {
			
		}
	}
    /*
     * 
     * 
     * Applies any middleware to be used by this app
     * 
     */
    applyMiddleware() {
        // this.apolloApp.applyMiddleware()
        //Allows the server to parse json
        // this.expressApp.use(apolloUploadExpress({uploadDir: "../firmware"}))
        this.expressApp.use(bodyParser.json())
        this.expressApp.use(cors())
        // Registers the routes used by the app
        new Routes(this.expressApp)
		sqliteClient.connect()
influxClient.connect()
mqttClient.connect()

    }

    /*
     * 
     * 
     * Runs the app
     * 
     */
    run() {
		this.connectToServers()
        // this.apolloApp.listen(this.configs.port).then(({url}) => {
        //     console.log('Apollo server running project at ' + url + on port ' + this.configs.port + '.')
        // })
        this.expressApp.listen(this.configs.port, () => {
            console.log("Express server running project on port " + this.configs.port + ".")
        })
    }
}

//Runs the thing
const app = new App()
app.applyMiddleware()
app.run()