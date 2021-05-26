const express = require('express');
const Routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');


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
    }
}

//Runs the thing
const app = new App()
app.applyMiddleware()
app.run()