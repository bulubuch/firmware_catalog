const influx = require('influx')
const settings = require('../../config/settings')

module.exports = class influxClient {
	static _host
	static _storrages
	static _username
	static _password
	static _connections = {}

	getStorrage(){
		
	}
	
	static init({host, username, password, storrages, url}) {
		this._host = host;
		this._storrages = storrages;
		this._username = username;
		this._password = password;
		this._url = url;
		console.log(`Creating INFLUX client hots: ${url}`)
		for (const name in storrages) {
			this._connections[name] = {
				database: storrages[name].database,
				client: new influx.InfluxDB({
					host,
				// database: storrages[name].database,
				// schema: storrages[name].schemas,
				// username,
				// password
				})
			}
			this._connections[name].client.getDatabaseNames()
			.then(names => {
				if (!names.includes(this._connections[name].database)) {
					influx.createDatabase(storrages[name].database);
				}
			})
		}
		// this._client = this
		console.log("Influx init Done");
		return this
	}


	static client(name) {
		if (this._client) { return this._client }
		else {
			return null
		}
	}

	static connect() {

	}

}
