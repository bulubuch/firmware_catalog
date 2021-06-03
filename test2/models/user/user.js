const sqliteDAO = require('../../lib/dao/sqlite')
const config = require('../../../config/app-settings');
const type = require('./type.js');

class User extends sqliteDAO {

	static db = this.getDatabase('user')
    /*
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'user'
    }

	static get type() {
		return type
	}

    /*
     * Returns a user by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /*
     * Returns a list of users matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields) {
        // Returns early with all users if no criteria was passed
        if (Object.keys(fields).length === 0) return this.findAll(this.db)
        
        // Find matching users
        return this.findByFields(db, {
            fields
        })
    }

    static async deleteUser(_, id) {
        console.log("DELETED User")
        try {
            let _result = await this.delete(this.db, id)
			return _result
		} finally {
			console.log("User Deleted");
        }
    }

    /*
     * Create user at first connection
     */
    static async createUser(_, {id, first_name, last_name, email, password, phone, comments, role, status, created_at, updated_at, deleted_at}) {
        console.log("Creating User")
        try {
            let _result = await this.insert({
                data: {
	id: {
		type: "id",
		required: true,
		unique: true,
		primary: true
	},
	first_name: {
		required: true,
		name: "first_name",
		type: "string"
	},
	last_name: {
		required: true,
		name: "last_name",
		type: "string"
	},
	email: {
		required: true,
		name: "email",
		type: "email"
	},
	password: {
		required: true,
		name: "password",
		type: "password"
	},
	phone: {
		name: "phone",
		type: "string"
	},
	comments: {
		name: "comments",
		type: "string"
	},
	role: {
		required: true,
		name: "role",
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
			console.log("Createed user");
        }
    }

    /*
     * Updates a user 
     */
    static async updateUser(_, {id, first_name, last_name, email, password, phone, comments, role, status, created_at, updated_at, deleted_at}) {
        console.log("User Update...")
        try {
            await this.update({
                id,
                data: {id, first_name, last_name, email, password, phone, comments, role, status, created_at, updated_at, deleted_at}
			});

            return this.getByID(_, {id})
        } finally {
			console.log("Updated user");
        }
    }
}

module.exports = User