const DAO = require('../../lib/dao/sqlite')
const config = require('../../../config/app-settings');
const type = require('./type.js');

class Component extends DAO {

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
     * Returns a model_name by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /*
     * Returns a list of model_names matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields) {
        // Returns early with all model_names if no criteria was passed
        if (Object.keys(fields).length === 0) return this.findAll()
        
        // Find matching model_names
        return this.findByFields({
            fields
        })
    }
    static async deleteComponent(_, id) {
        console.log("DELETED Component")
        try {
            let _result = await this.delete(id)
			return _result;
        } finally {
			console.log("Component Deleted");
        }
    }

    /*
     * Register component at first connection
     */
    static async registerComponent(_, {device_id, model_name = "Unknown", type, builtin, status}) {
        console.log("PREREGISTER Component")
        try {
            let _result = await this.insert({
                data: {
                    device_id,
                    model_name,
					type,
                    builtin,
                    status
                }
            })
            return this.getByID(_, {id: _result.insertId})
        } finally {
			console.log("Registered component");
        }
    }

    /*
     * Updates a component 
     */
    static async updateEntry(_, {id, device_id, model_name = "Unknown", type, builtin, status}) {
        console.log("Component Update...")
        try {
            await this.update(connection, {
                id,
                data: {
                    device_id,
					model_name,
					type,
					builtin,
					status
                }
            })

            return this.getByID(_, {id})
        } finally {
			console.log("Updated component");
        }
    }
}

module.exports = Component