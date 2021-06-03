const sqlite = require('sqlite')
const settings = require('../../config/settings')

module.exports = class sqliteClient {
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
