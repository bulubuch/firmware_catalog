const sqliteDAO = require('../../lib/dao/sqlite')
const config = require('../../../config/app-settings');
const type = require('./type.js');

class Object extends sqliteDAO {

	static db = this.getDatabase('project')
    /*
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'object'
    }

	static get type() {
		return type
	}

    /*
     * Returns a object by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /*
     * Returns a list of objects matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields) {
        // Returns early with all objects if no criteria was passed
        if (Object.keys(fields).length === 0) return this.findAll(this.db)
        
        // Find matching objects
        return this.findByFields(db, {
            fields
        })
    }

    static async deleteObject(_, id) {
        console.log("DELETED Object")
        try {
            let _result = await this.delete(this.db, id)
			return _result
		} finally {
			console.log("Object Deleted");
        }
    }

    /*
     * Create object at first connection
     */
    static async createObject(_, {id, project_id, parent_id, name, type, visible, status, created_at, updated_at, deleted_at}) {
        console.log("Creating Object")
        try {
            let _result = await this.insert({
                data: {
	id: {
		type: "id",
		required: true,
		unique: true,
		primary: true
	},
	project_id: {
		required: true,
		name: "project_id",
		type: "id"
	},
	parent_id: {
		required: true,
		name: "parent_id",
		type: "id"
	},
	name: {
		unique: true,
		required: true,
		name: "name",
		type: "string"
	},
	type: {
		required: true,
		name: "type",
		type: "string"
	},
	visible: {
		required: true,
		name: "visible",
		type: "integer"
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
			console.log("Createed object");
        }
    }

    /*
     * Updates a object 
     */
    static async updateObject(_, {id, project_id, parent_id, name, type, visible, status, created_at, updated_at, deleted_at}) {
        console.log("Object Update...")
        try {
            await this.update({
                id,
                data: {id, project_id, parent_id, name, type, visible, status, created_at, updated_at, deleted_at}
			});

            return this.getByID(_, {id})
        } finally {
			console.log("Updated object");
        }
    }
}

module.exports = Object