const express = require('express');
const Routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const appSettings = require('../config/app-settings');
const mqtt = require('./lib/mqttclient');
const Influx = require('influx')
const influx = require('./lib/influxclient');

class App {
    
    /**
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
                return process.env.PORT || 7000
            }
        }
		this.influxClient = null;
		this.mqttClient = mqtt.init(`mqtt://${appSettings.mqtt_broker}`,{clientId:appSettings.mqtt_client_id});
    }
    /**
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
		this.influxClient = new Promise((resolve, reject) => {
			let client = influx.init(appSettings.influx_host, appSettings.influx_database, [
			{
				measurement: 'telemetry',
				fields: {
					air_temperature: Influx.FieldType.INTEGER,
					air_humidity: Influx.FieldType.INTEGER,
					soil_temperature: Influx.FieldType.INTEGER,
					soil_moisture: Influx.FieldType.INTEGER,
					battery: Influx.FieldType.INTEGER
				},
				tags: [
					'device_uid'
				]
			}]);
			if (client) {
				resolve(client);
			} else {
				reject(client);
			}
		})
		this.influxClient.then(res => {
			mqtt.start(res);
			return res;
		}).catch(err => {

		});
        // Registers the routes used by the app
        new Routes(this.expressApp)
    }

    /**
     * 
     * 
     * Runs the app
     * 
     */
    run() {
        // this.apolloApp.listen(this.configs.port).then(({url}) => {
        //     console.log(`Apollo server running project at ${url} on port ${this.configs.port}.`)
        //     console.log(`Environment: ${process.env.STAGE || "development"}`)
        // })
        this.expressApp.listen(this.configs.port, () => {
            console.log("Express server running project on port " + this.configs.port + ".")
            console.log(`Environment: ${process.env.STAGE || "development"}`)
        })
    }
}

//Runs the thing
const app = new App()
app.applyMiddleware()
app.run()