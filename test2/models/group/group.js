const sqliteDAO = require('../../lib/dao/sqlite')
const config = require('../../../config/app-settings');
const type = require('./type.js');

class Group extends sqliteDAO {

	static db = this.getDatabase('user')
    /*
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'group'
    }

	static get type() {
		return type
	}

    /*
     * Returns a group by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /*
     * Returns a list of groups matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields) {
        // Returns early with all groups if no criteria was passed
        if (Object.keys(fields).length === 0) return this.findAll(this.db)
        
        // Find matching groups
        return this.findByFields(db, {
            fields
        })
    }

    static async deleteGroup(_, id) {
        console.log("DELETED Group")
        try {
            let _result = await this.delete(this.db, id)
			return _result
		} finally {
			console.log("Group Deleted");
        }
    }

    /*
     * Create group at first connection
     */
    static async createGroup(_, {id, name, permissions, created_at, updated_at, deleted_at}) {
        console.log("Creating Group")
        try {
            let _result = await this.insert({
                data: {
	id: {
		type: "id",
		required: true,
		unique: true,
		primary: true
	},
	name: {
		required: true,
		name: "name",
		type: "string"
	},
	permissions: {
		name: "permissions",
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
			console.log("Createed group");
        }
    }

    /*
     * Updates a group 
     */
    static async updateGroup(_, {id, name, permissions, created_at, updated_at, deleted_at}) {
        console.log("Group Update...")
        try {
            await this.update({
                id,
                data: {id, name, permissions, created_at, updated_at, deleted_at}
			});

            return this.getByID(_, {id})
        } finally {
			console.log("Updated group");
        }
    }
}

module.exports = Group