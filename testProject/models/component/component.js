const sqliteDAO = require('../../lib/dao/sqlite')
const config = require('../../../config/app-settings');
const type = require('./type.js');

class Component extends sqliteDAO {

	static db = this.getDatabase('device')
    /*
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'component'
    }

	static get type() {
		return type
	}

    /*
     * Returns a component by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /*
     * Returns a list of components matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields) {
        // Returns early with all components if no criteria was passed
        if (Object.keys(fields).length === 0) return this.findAll(this.db)
        
        // Find matching components
        return this.findByFields(db, {
            fields
        })
    }

    static async deleteComponent(_, id) {
        console.log("DELETED Component")
        try {
            let _result = await this.delete(this.db, id)
			return _result
		} finally {
			console.log("Component Deleted");
        }
    }

    /*
     * Create component at first connection
     */
    static async createComponent(_, {id, device_id, model_name, type, builtin, status, created_at, updated_at, deleted_at}) {
        console.log("Creating Component")
        try {
            let _result = await this.insert({
                data: {
	id: {
		type: "id",
		required: true,
		unique: true,
		primary: true
	},
	device_id: {
		required: true,
		name: "device_id",
		type: "id"
	},
	model_name: {
		required: true,
		name: "model_name",
		type: "string"
	},
	type: {
		required: true,
		name: "type",
		type: "string"
	},
	builtin: {
		required: true,
		name: "builtin",
		type: "boolean"
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
			console.log("Createed component");
        }
    }

    /*
     * Updates a component 
     */
    static async updateComponent(_, {id, device_id, model_name, type, builtin, status, created_at, updated_at, deleted_at}) {
        console.log("Component Update...")
        try {
            await this.update({
                id,
                data: {id, device_id, model_name, type, builtin, status, created_at, updated_at, deleted_at}
			});

            return this.getByID(_, {id})
        } finally {
			console.log("Updated component");
        }
    }
}

module.exports = Component