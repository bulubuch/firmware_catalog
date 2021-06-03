const sqliteDAO = require('../../lib/dao/sqlite')
const config = require('../../../config/app-settings');
const type = require('./type.js');

class Action extends sqliteDAO {

	static db = this.getDatabase('project')
    /*
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'action'
    }

	static get type() {
		return type
	}

    /*
     * Returns a action by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /*
     * Returns a list of actions matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields) {
        // Returns early with all actions if no criteria was passed
        if (Object.keys(fields).length === 0) return this.findAll(this.db)
        
        // Find matching actions
        return this.findByFields(db, {
            fields
        })
    }

    static async deleteAction(_, id) {
        console.log("DELETED Action")
        try {
            let _result = await this.delete(this.db, id)
			return _result
		} finally {
			console.log("Action Deleted");
        }
    }

    /*
     * Create action at first connection
     */
    static async createAction(_, {id, user_id, name, description, type, param, target_type, target, created_at, updated_at, deleted_at}) {
        console.log("Creating Action")
        try {
            let _result = await this.insert({
                data: {
	id: {
		type: "id",
		required: true,
		unique: true,
		primary: true
	},
	user_id: {
		required: true,
		name: "user_id",
		type: "id"
	},
	name: {
		unique: true,
		required: true,
		name: "name",
		type: "string"
	},
	description: {
		name: "description",
		type: "string"
	},
	type: {
		required: true,
		name: "type",
		type: "string"
	},
	param: {
		required: true,
		name: "param",
		type: "string"
	},
	target_type: {
		required: true,
		name: "target_type",
		type: "string"
	},
	target: {
		name: "target",
		type: "id"
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
			console.log("Createed action");
        }
    }

    /*
     * Updates a action 
     */
    static async updateAction(_, {id, user_id, name, description, type, param, target_type, target, created_at, updated_at, deleted_at}) {
        console.log("Action Update...")
        try {
            await this.update({
                id,
                data: {id, user_id, name, description, type, param, target_type, target, created_at, updated_at, deleted_at}
			});

            return this.getByID(_, {id})
        } finally {
			console.log("Updated action");
        }
    }
}

module.exports = Action