const sqliteDAO = require('../../lib/dao/sqlite')
const config = require('../../../config/app-settings');
const type = require('./type.js');

class Task extends sqliteDAO {

	static db = this.getDatabase('project')
    /*
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'task'
    }

	static get type() {
		return type
	}

    /*
     * Returns a task by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /*
     * Returns a list of tasks matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields) {
        // Returns early with all tasks if no criteria was passed
        if (Object.keys(fields).length === 0) return this.findAll(this.db)
        
        // Find matching tasks
        return this.findByFields(db, {
            fields
        })
    }

    static async deleteTask(_, id) {
        console.log("DELETED Task")
        try {
            let _result = await this.delete(this.db, id)
			return _result
		} finally {
			console.log("Task Deleted");
        }
    }

    /*
     * Create task at first connection
     */
    static async createTask(_, {id, project_id, object_id, user_id, name, description, type, action, repeat, schedule, status, created_at, updated_at, deleted_at}) {
        console.log("Creating Task")
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
	object_id: {
		required: true,
		name: "object_id",
		type: "id"
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
	action: {
		required: true,
		name: "action",
		type: "string"
	},
	repeat: {
		required: true,
		name: "repeat",
		type: "string"
	},
	schedule: {
		required: true,
		name: "schedule",
		type: "timestamp"
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
			console.log("Createed task");
        }
    }

    /*
     * Updates a task 
     */
    static async updateTask(_, {id, project_id, object_id, user_id, name, description, type, action, repeat, schedule, status, created_at, updated_at, deleted_at}) {
        console.log("Task Update...")
        try {
            await this.update({
                id,
                data: {id, project_id, object_id, user_id, name, description, type, action, repeat, schedule, status, created_at, updated_at, deleted_at}
			});

            return this.getByID(_, {id})
        } finally {
			console.log("Updated task");
        }
    }
}

module.exports = Task