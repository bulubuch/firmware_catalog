const sqliteDAO = require('../../lib/dao/sqlite')
const config = require('../../../config/app-settings');
const type = require('./type.js');

class Layer extends sqliteDAO {

	static db = this.getDatabase('project')
    /*
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'layer'
    }

	static get type() {
		return type
	}

    /*
     * Returns a layer by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /*
     * Returns a list of layers matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields) {
        // Returns early with all layers if no criteria was passed
        if (Object.keys(fields).length === 0) return this.findAll(this.db)
        
        // Find matching layers
        return this.findByFields(db, {
            fields
        })
    }

    static async deleteLayer(_, id) {
        console.log("DELETED Layer")
        try {
            let _result = await this.delete(this.db, id)
			return _result
		} finally {
			console.log("Layer Deleted");
        }
    }

    /*
     * Create layer at first connection
     */
    static async createLayer(_, {id, project_id, name, type, visible, status, created_at, updated_at, deleted_at}) {
        console.log("Creating Layer")
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
			console.log("Createed layer");
        }
    }

    /*
     * Updates a layer 
     */
    static async updateLayer(_, {id, project_id, name, type, visible, status, created_at, updated_at, deleted_at}) {
        console.log("Layer Update...")
        try {
            await this.update({
                id,
                data: {id, project_id, name, type, visible, status, created_at, updated_at, deleted_at}
			});

            return this.getByID(_, {id})
        } finally {
			console.log("Updated layer");
        }
    }
}

module.exports = Layer