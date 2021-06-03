 /*
**	Project definifition for scaffolding
**	
	project: {
		api {
			name: "modulabAPI",
			name: "Yolo",
}	
}
*/

// const helper = require("scaffold").helper
const scaff = require("./scaffold/scaffold")
const modul = require("./scaffold/src/application").modul
const utils = require("./scaffold/src/utils")
const fs = require("fs")
const path = require("path")

const dependencies = [
	"bcrypt"
]

const static_options = {
	task: {
		repeat: [
			{
				name: "once",
				description: "one time only"
			},
			{
				name: "hourly",
				description: "every hour"
			},
			{
				name: "daily",
				description: "every day"
			},
			{
				name: "weekly",
				description: "every week"
			},
			{
				name: "monthly",
				description: "every week"
			},
			{
				name: "every",
				description: "every specified number minutes"
			},
		],
		type: [
			{
				name: "switch",
				description: "Turn ON or OFF"
			},
			{
				name: "toggle",
				description: "Turn ON if OFF and OFF if ON"
			},
			{
				name: "set",
				description: "Set to value"
			},
			{
				name: "custom",
				description: "Use custom action"
			}
		]
	},
	action: {
		type: [
			{
				name: "switch",
				description: "Turn ON or OFF"
			},
			{
				name: "toggle",
				description: "Turn ON if OFF and OFF if ON"
			},
			{
				name: "set",
				description: "Set to value"
			},
			{
				name: "notify",
				description: "send a notification to"
			},
			{
				name: "report",
				description: "send a notification"
			},
			{
				name: "custom",
				description: "custom action"
			}
		],
		target_type: [
			{
				name: "device",
				description: "Turn ON or OFF"
			},
			{
				name: "user",
				description: "Turn ON if OFF and OFF if ON"
			}
		]
	}
}

const clients = {
	sqlite: {
		type: "sqlite",
		host: "localhost",
		port: "",
	},
	influx: {
		type: "influx",
		host: "192.168.1.137",
		port: "",
	},
	mqtt: {
		type: "mqtt",
		protocol: "mqtt",
		host: "192.168.1.137",
		topics: ['telemetry', 'register'],
		port: 1883,
	}
}

const ressources = {

}

const storrages = {
	devices: {
		name: "device",
		type: "sqlite",
		database: "data/devices.db"
	},
	users: {
		name: "users",
		type: "sqlite",
		database: "data/users.db"
	},
	firmwares: {
		name: "firmwares",
		type: "sqlite",
		database: "data/firmwares.db"
	},
	firmware_binaries: {
		name: "firmware_binaries",
		type: "local",
		database: "data/firmwares/"
	},
	projects: {
		name: "projects",
		type: "sqlite",
		database: "data/projects.db"
	},
	tasks: {
		name: "tasks",
		type: "sqlite",
		database: "data/actions.db"
	},
	actions: {
		name: "actions",
		type: "sqlite",
		database: "data/actions.db"
	},
	measurements: {
		name: "telemetry",
		type: 'influx',
		server: "influx",
		database: "influx",

	}
}

const api = {
	type: "api",
	name: "modulab_api",
	host: "0.0.0.0",
	private_key: "ModulabApiPrivateKey",
	port: 7000
}
// const admin= {
// 	type: "admin",
// 	name: "modulabAdmin",
// 	host: "0.0.0.0",
// 	port: 8000
// }
const models = {
	user: {
		description: "Application user model",
		admin_only: "D",
		storrage: {
			name: "sqlite",
			db: "user"
		},
		fields: {
			first_name: {
				type: "string",
				required: true
			},
			last_name: {
				type: "string",
				required: true
			},
			email: {
				type: "email",
				required: true
			},
			password: {
				type: "password",
				required: true
			},
			phone: {
				type: "string"
			},
			comments: {
				type: "string"
			},
			role: {
				type: "string",
				required: true,
				default: "user"
			},
			status: {
				type: "string",
				required: true,
				default: "new"
			}	
		}
	},
	group: {
		admin_only: "CUD",
		storrage: {
			name: "sqlite",
			db: "user"
		},
		fields: {
			name: {
				type: "string",
				required: true
			},
			permissions: {
				type: "string"
			}
		}
	},
	group_user: {
		admin_only: "CUD",
		storrage: {
			name: "sqlite",
			db: "user"
		},
		fields: {
			group_id: {
				type: "id",
				required: true
			},
			user_id: {
				type: "id",
				required: true
			}
		}
	},
	project: {
		admin_only: "CUD",
		storrage: {
			name: "sqlite",
			db: "project"
		},
		fields: {
			id: {
				type: 'id',
				required: true,
			},
			user_id: {
				type: "id",
				required: true
			},
			name: {
				type: "string",
				unique: true,
				unique: true,
				required: true
			},
			type: {
				type: "string",
				required: true,
				default: "generic"
			},
			visible: {
				type: "integer",
				required: true,
				default: true
			},
			status: {
				type: "string",
				required: true,
				default: "new"
			}	
		}
	},
	object: {
		admin_only: "CUD",
		storrage: {
			name: "sqlite",
			db: "project"
		},
		fields: {
			project_id: {
				type: "id",
				required: true
			},
			parent_id: {
				type: "id",
				required: true
			},
			name: {
				type: "string",
				unique: true,
				required: true
			},
			type: {
				type: "string",
				required: true,
				default: "generic"
			},
			visible: {
				type: "integer",
				required: true,
				default: true
			},
			status: {
				type: "string",
				required: true,
				default: "new"
			}	
		}
	},
	layer: {
		admin_only: "CUD",
		storrage: {
			name: "sqlite",
			db: "project"
		},
		fields: {
			project_id: {
				type: "id",
				required: true
			},
			name: {
				type: "string",
				unique: true,
				required: true
			},
			type: {
				type: "string",
				required: true,
				default: "generic"
			},
			visible: {
				type: "integer",
				required: true,
				default: true
			},
			status: {
				type: "string",
				required: true,
				default: "new"
			}	
		}
	},
	object_device: {
		admin_only: "CUD",
		storrage: {
			name: "sqlite",
			db: "project"
		},
		fields: {
			object_id: {
				type: "id",
				required: true
			},
			device_id: {
				type: "id",
				required: true
			},
			visible: {
				type: "integer",
				required: true,
				default: true
			}	
		}
	},
	action: {
		admin_only: "CRUD",
		storrage: {
			name: "sqlite",
			db: "project"
		},
		fields: {
			user_id: {
				type: "id",
				required: true
			},
			name: {
				type: "string",
				required: true,
				unique: true
			},
			description: {
				type: "string"
			},
			type: {
				description: "Type of action to perform",
				type: "string",
				required: true,
				default: "switch"
			},
			param: {
				type: "string",
				required: true,
				default: "on"
			},
			target_type: {
				type: "string",
				required: true,
				default: "device"
			},
			target: {
				type: "id",
				reference: "dynamic"
			}
		}
	},
	task: {
		admin_only: "CUD",
		storrage: {
			name: "sqlite",
			db: "project"
		},
		fields: {
			project_id: {
				type: "id",
				required: true
			},
			object_id: {
				type: "id",
				required: true
			},
			user_id: {
				type: "id",
				required: true
			},
			name: {
				type: "string",
				required: true,
				unique: true
			},
			description: {
				type: "string"
			},
			type: {
				type: "string",
				required: true,
				default: "schedule"
			},
			action: {
				type: "string",
				required: true,
				default: "report"
			},
			repeat: {
				type: "string",
				required: true,
				default: "once"
			},
			schedule: {
				type: "timestamp",
				required: true,
				default: "now"
			},
			status: {
				type: "string",
				required: true,
				default: "new"
			}
		}
	},
	device: {
		admin_only: "CRUD",
		storrage: {
			name: "sqlite",
			db: "device"
		},
		fields: {
			uid: {
				type: "string",
				unique: true,
				required: true
			},
			model_name: {
				type: "string",
				required: true
			},
			firmware_version: {
				type: "double",
				required: true
			},
			name: {
				type: "string",
			},
			status: {
				type: "string",
				required: true,
				default: "new"
			}	
		}
	},
	component: {
		admin_only: "CRUD",
		storrage: {
			name: "sqlite",
			db: "device"
		},
		fields: {
			device_id: {
				type: "id",
				required: true
			},
			model_name: {
				type: "string",
				required: true
			},
			type: {
				type: "string",
				required: true
			},
			builtin: {
				type: "boolean",
				required: true,
				default: 1
			},
			status: {
				type: "string",
				required: true,
				default: "new"
			}	
		}
	},
	firmware: {
		admin_only: "UD",
		storrage: {
			name: "sqlite",
			db: "device"
		},
		fields: {
			model_name: {
				type: "string",
				required: true
			},
			version: {
				type: "double",
				required: true
			},
			description: {
				type: "string",
				required: true
			},
			url: {
				type: "string",
				required: true
			},
			status: {
				type: "string",
				required: true,
				default: "new"
			}	
		}
	},
	telemetry: {
		admin_only: false,
		storrage: {
			name: "influx",
			db: "modulab",
			measurement: "telemetry"
		},
		fields: {
			device_uid: {
				type: "tag",
				required: true
			},
			battery: {
				type: "integer"
			},
			air_temperature: {
				type: "integer"
			},
			air_humidity: {
				type: "integer"
			},
			air_pressure: {
				type: "integer"
			},
			soil_moisture: {
				type: "integer"
			},
			soil_temperature: {
				type: "integer"
			},
			wind_direction: {
				type: "string"
			},
			wind_speed: {
				type: "integer"
			},
			location: {
				type: "string"
			},
			light: {
				type: "integer"
			},
			pir: {
				type: "integer"
			},
			button: {
				type: "integer"
			},
			latch: {
				type: "integer"
			},
		}
	}

}


let app = new modul({
	config: api,
	clients,
	storrages,
	models,
	statics: static_options,
	dependencies
})
let dest_path
if (process.argv.length > 2) {
	dest_path = path.join(__dirname, process.argv[2]);
	if (!(fs.existsSync(dest_path))) {
		console.log(`Folder does not exst, will create a new one: ${dest_path}`)
	}
}



app.scaffold(dest_path)