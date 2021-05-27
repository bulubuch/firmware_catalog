const express = require('express');
const Routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const telemetry = require('../controllers/telemetry.js');
const register = require('../controllers/register.js');
const mqtt = require('mqtt');

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
		this.mqttClient = mqtt.connect("mqtt://localhost",{clientId:"modulabAPI"});

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
        const app = this.expressApp
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
		this.mqttClient.on('message',function(topic, message, packet){
			console.log("message is "+ message);
			console.log("topic is "+ topic);
			if (topic == "telemetry") {
				telemetry.process(message);
			}
			if (topic == "register") {
				register.process(message);
			}
		});
		
		this.mqttClient.on("connect",function(){	
			console.log("connected ");
		})
		
		//handle errors
		this.mqttClient.on("error",function(error){
			console.log("Can't connect" + error);
		});
		
		this.mqttClient.subscribe("telemetry",{qos:1});
		this.mqttClient.subscribe("register",{qos:1});
    }
}

//Runs the thing
const app = new App()
app.applyMiddleware()
app.run()