const sqliteDAO = require('../../lib/dao/sqlite')
const config = require('../../../config/app-settings');
const type = require('./type.js');

class Device extends sqliteDAO {

	static db = this.getDatabase('device')
    /*
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'device'
    }

	static get type() {
		return type
	}

    /*
     * Returns a device by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /*
     * Returns a list of devices matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields) {
        // Returns early with all devices if no criteria was passed
        if (Object.keys(fields).length === 0) return this.findAll(this.db)
        
        // Find matching devices
        return this.findByFields(db, {
            fields
        })
    }

    static async deleteDevice(_, id) {
        console.log("DELETED Device")
        try {
            let _result = await this.delete(this.db, id)
			return _result
		} finally {
			console.log("Device Deleted");
        }
    }

    /*
     * Create device at first connection
     */
    static async createDevice(_, {id, uid, model_name, firmware_version, name, status, created_at, updated_at, deleted_at}) {
        console.log("Creating Device")
        try {
            let _result = await this.insert({
                data: {
	id: {
		type: "id",
		required: true,
		unique: true,
		primary: true
	},
	uid: {
		unique: true,
		required: true,
		name: "uid",
		type: "string"
	},
	model_name: {
		required: true,
		name: "model_name",
		type: "string"
	},
	firmware_version: {
		required: true,
		name: "firmware_version",
		type: "double"
	},
	name: {
		name: "name",
		type: "string"
	},
	status: {
		required: true,
		name: "status",
		type: "string"
	},
	created_at: {
		type: "date",
		required: true,
		default: "now"
	},
	updated_at: {
		type: "date",
		required: true,
		default: "now"
	},
	deleted_at: {
		type: "date"
	}
}
            })
            return this.getByID(_, {id: _result})
		} finally {
			console.log("Createed device");
        }
    }

    /*
     * Updates a device 
     */
    static async updateDevice(_, {id, uid, model_name, firmware_version, name, status, created_at, updated_at, deleted_at}) {
        console.log("Device Update...")
        try {
            await this.update({
                id,
                data: {id, uid, model_name, firmware_version, name, status, created_at, updated_at, deleted_at}
			});

            return this.getByID(_, {id})
        } finally {
			console.log("Updated device");
        }
    }
}

module.exports = Device