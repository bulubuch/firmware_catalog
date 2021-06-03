const utils = require('../../src/utils')

module.exports = (app) => {
	let includes = ""
	let init = ""
	let connect = ""
	let srv;
	for (const name in app.clients) {
		srv = app.clients[name]
		includes += `const ${srv.type}Client = require('./lib/client/${srv.type}Client.js')\n`;
		init += `${srv.type}Client.init(settings.clients['${srv.name}'])\n`;
		connect += `${srv.type}Client.connect()\n`;
	}
	return `const express = require('express');
const Routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const settings = require('./config/settings');
${includes}

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
		${init}
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
		${connect}
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
app.run()`
}