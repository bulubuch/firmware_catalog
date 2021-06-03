const sqliteDAO = require('../../lib/dao/sqlite')
const config = require('../../../config/app-settings');
const type = require('./type.js');

class Project extends sqliteDAO {

	static db = this.getDatabase('project')
    /*
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'project'
    }

	static get type() {
		return type
	}

    /*
     * Returns a project by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /*
     * Returns a list of projects matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields) {
        // Returns early with all projects if no criteria was passed
        if (Object.keys(fields).length === 0) return this.findAll(this.db)
        
        // Find matching projects
        return this.findByFields(db, {
            fields
        })
    }

    static async deleteProject(_, id) {
        console.log("DELETED Project")
        try {
            let _result = await this.delete(this.db, id)
			return _result
		} finally {
			console.log("Project Deleted");
        }
    }

    /*
     * Create project at first connection
     */
    static async createProject(_, {id, user_id, name, type, visible, status, created_at, updated_at, deleted_at}) {
        console.log("Creating Project")
        try {
            let _result = await this.insert({
                data: {
	id: {
		required: true,
		name: "id",
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
			console.log("Createed project");
        }
    }

    /*
     * Updates a project 
     */
    static async updateProject(_, {id, user_id, name, type, visible, status, created_at, updated_at, deleted_at}) {
        console.log("Project Update...")
        try {
            await this.update({
                id,
                data: {id, user_id, name, type, visible, status, created_at, updated_at, deleted_at}
			});

            return this.getByID(_, {id})
        } finally {
			console.log("Updated project");
        }
    }
}

module.exports = Project