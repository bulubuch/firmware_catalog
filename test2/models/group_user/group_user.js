const sqliteDAO = require('../../lib/dao/sqlite')
const config = require('../../../config/app-settings');
const type = require('./type.js');

class Group_User extends sqliteDAO {

	static db = this.getDatabase('user')
    /*
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'group_user'
    }

	static get type() {
		return type
	}

    /*
     * Returns a group_user by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /*
     * Returns a list of group_users matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields) {
        // Returns early with all group_users if no criteria was passed
        if (Object.keys(fields).length === 0) return this.findAll(this.db)
        
        // Find matching group_users
        return this.findByFields(db, {
            fields
        })
    }

    static async deleteGroup_User(_, id) {
        console.log("DELETED Group_User")
        try {
            let _result = await this.delete(this.db, id)
			return _result
		} finally {
			console.log("Group_User Deleted");
        }
    }

    /*
     * Create group_user at first connection
     */
    static async createGroup_User(_, {id, group_id, user_id, created_at, updated_at, deleted_at}) {
        console.log("Creating Group_User")
        try {
            let _result = await this.insert({
                data: {
	id: {
		type: "id",
		required: true,
		unique: true,
		primary: true
	},
	group_id: {
		required: true,
		name: "group_id",
		type: "id"
	},
	user_id: {
		required: true,
		name: "user_id",
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
			console.log("Createed group_user");
        }
    }

    /*
     * Updates a group_user 
     */
    static async updateGroup_User(_, {id, group_id, user_id, created_at, updated_at, deleted_at}) {
        console.log("Group_User Update...")
        try {
            await this.update({
                id,
                data: {id, group_id, user_id, created_at, updated_at, deleted_at}
			});

            return this.getByID(_, {id})
        } finally {
			console.log("Updated group_user");
        }
    }
}

module.exports = Group_User