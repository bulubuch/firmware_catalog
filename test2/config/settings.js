'use strict'

/*
** Application Settings - all relative to the project root
*/

const clients = {
	sqlite: {
		name: "sqlite",
		host: "localhost",
		path: "./data/sqlite/",
		type: "sqlite",
		storrages: {
			
		},
		url: "localhost/./data/sqlite/"
	},
	influx: {
		name: "influx",
		host: "192.168.1.137",
		port: "",
		type: "influx",
		storrages: {
			
		},
		url: "192.168.1.137"
	},
	mqtt: {
		name: "mqtt",
		host: "192.168.1.137",
		port: 1883,
		protocol: "mqtt",
		type: "mqtt",
		storrages: {
			
		},
		url: "mqtt://192.168.1.137:1883"
	}
};
const storrages = {
	devices: {
		name: "device",
		node_module: "sqlite3",
		type: "sqlite"
	},
	users: {
		name: "users",
		node_module: "sqlite3",
		type: "sqlite"
	},
	firmwares: {
		name: "firmwares",
		node_module: "sqlite3",
		type: "sqlite"
	},
	projects: {
		name: "projects",
		node_module: "sqlite3",
		type: "sqlite"
	},
	tasks: {
		name: "tasks",
		node_module: "sqlite3",
		type: "sqlite"
	},
	measurements: {
		name: "telemetry",
		node_module: "influx",
		type: "influx",
		schemas: [
			{
				measurement: "telemetry",
				fields: {
					battery: 1,
					air_temperature: 1,
					air_humidity: 1,
					air_pressure: 1,
					soil_moisture: 1,
					soil_temperature: 1,
					wind_direction: 2,
					wind_speed: 1,
					location: 2,
					light: 1,
					pir: 1,
					button: 1,
					latch: 1
				},
				tags: [
					"device_uid"
				]
			}
		],
		databases: [
			"modulab"
		],
		client: "influx",
		database: "modulab"
	}
};

const appSettings = {
	type: "api",
	name: "modulab_api",
	host: "0.0.0.0",
	private_key: "ModulabApiPrivateKey",
	port: 7000
};

module.exports = { clients, storrages, app:appSettings };