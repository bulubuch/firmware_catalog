const DAO = require('../../lib/dao')
const config = require('../../../config/app-settings');
const type = require('./type.js');

class Firmware extends DAO {

    /**
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'firmware'
    }

	static get type() {
		return type
	}

    /**
     * Returns a model by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /**
     * Returns a list of models matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields) {
        // Returns early with all models if no criteria was passed
        if (Object.keys(fields).length === 0) return this.findAll()
        
        // Find matching models
        return this.findByFields({
            fields
        })
    }

    static async deleteFirmware(_, {id}) {
        console.log("DELETED Firmware")
        try {
            let _result = await this.delete(id)
			return _result
		} finally {
			console.log("Firmware Deleted");
        }
    }

    /**
     * Uploads a new firmware
     */
    static async uploadFirmware(_, {model_name, version, description, url, status}) {
        console.log("Upload Firmware")
        try {
            let _result = await this.insert({
                data: {
					model_name,
					version,
					description,
					url,
					status
                }
            })
            return this.getByID(_, {id: _result.insertId})
		} finally {
			console.log("Registered device");
        }
    }
	
    /**
     * Updates a firmware 
     */
	 static async updateEntry(_, {id, model_name, version, description, url, status}) {
        console.log("Firmware Update...")
        try {
            await this.update({
                id,
                data: {
                    model_name,
                    version,
                    description,
                    url,
					status
                }
			});

            return this.getByID(_, {id})
        } finally {
			console.log("Updated device");
        }
    }
}

module.exports = Firmware