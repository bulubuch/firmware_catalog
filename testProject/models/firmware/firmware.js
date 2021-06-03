const sqliteDAO = require('../../lib/dao/sqlite')
const config = require('../../../config/app-settings');
const type = require('./type.js');

class Firmware extends sqliteDAO {

	static db = this.getDatabase('device')
    /*
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'firmware'
    }

	static get type() {
		return type
	}

    /*
     * Returns a firmware by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /*
     * Returns a list of firmwares matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields) {
        // Returns early with all firmwares if no criteria was passed
        if (Object.keys(fields).length === 0) return this.findAll(this.db)
        
        // Find matching firmwares
        return this.findByFields(db, {
            fields
        })
    }

    static async deleteFirmware(_, id) {
        console.log("DELETED Firmware")
        try {
            let _result = await this.delete(this.db, id)
			return _result
		} finally {
			console.log("Firmware Deleted");
        }
    }

    /*
     * Create firmware at first connection
     */
    static async createFirmware(_, {id, model_name, version, description, url, status, created_at, updated_at, deleted_at}) {
        console.log("Creating Firmware")
        try {
            let _result = await this.insert({
                data: {
	id: {
		type: "id",
		required: true,
		unique: true,
		primary: true
	},
	model_name: {
		required: true,
		name: "model_name",
		type: "string"
	},
	version: {
		required: true,
		name: "version",
		type: "double"
	},
	description: {
		required: true,
		name: "description",
		type: "string"
	},
	url: {
		required: true,
		name: "url",
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
			console.log("Createed firmware");
        }
    }

    /*
     * Updates a firmware 
     */
    static async updateFirmware(_, {id, model_name, version, description, url, status, created_at, updated_at, deleted_at}) {
        console.log("Firmware Update...")
        try {
            await this.update({
                id,
                data: {id, model_name, version, description, url, status, created_at, updated_at, deleted_at}
			});

            return this.getByID(_, {id})
        } finally {
			console.log("Updated firmware");
        }
    }
}

module.exports = Firmware