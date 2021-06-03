const sqliteDAO = require('../../lib/dao/sqlite')
const config = require('../../../config/app-settings');
const type = require('./type.js');

class Object_Device extends sqliteDAO {

	static db = this.getDatabase('project')
    /*
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'object_device'
    }

	static get type() {
		return type
	}

    /*
     * Returns a object_device by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /*
     * Returns a list of object_devices matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields) {
        // Returns early with all object_devices if no criteria was passed
        if (Object.keys(fields).length === 0) return this.findAll(this.db)
        
        // Find matching object_devices
        return this.findByFields(db, {
            fields
        })
    }

    static async deleteObject_Device(_, id) {
        console.log("DELETED Object_Device")
        try {
            let _result = await this.delete(this.db, id)
			return _result
		} finally {
			console.log("Object_Device Deleted");
        }
    }

    /*
     * Create object_device at first connection
     */
    static async createObject_Device(_, {id, object_id, device_id, visible, created_at, updated_at, deleted_at}) {
        console.log("Creating Object_Device")
        try {
            let _result = await this.insert({
                data: {
	id: {
		type: "id",
		required: true,
		unique: true,
		primary: true
	},
	object_id: {
		required: true,
		name: "object_id",
		type: "id"
	},
	device_id: {
		required: true,
		name: "device_id",
		type: "id"
	},
	visible: {
		required: true,
		name: "visible",
		type: "integer"
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
			console.log("Createed object_device");
        }
    }

    /*
     * Updates a object_device 
     */
    static async updateObject_Device(_, {id, object_id, device_id, visible, created_at, updated_at, deleted_at}) {
        console.log("Object_Device Update...")
        try {
            await this.update({
                id,
                data: {id, object_id, device_id, visible, created_at, updated_at, deleted_at}
			});

            return this.getByID(_, {id})
        } finally {
			console.log("Updated object_device");
        }
    }
}

module.exports = Object_Device