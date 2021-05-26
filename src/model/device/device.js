const DAO = require('../../lib/dao')
const config = require('../../../config/app-settings');

class Device extends DAO {

    /**
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'device'
    }

    /**
     * Returns a model_name by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /**
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
    static async deleteDevice(_, id) {
        console.log("DELETED Device")
        try {
            let _result = await this.delete(id)
            if (_result.affectedRows > 0)
            {
                console.log("DELETED Device SUCCESS")
                console.log(_result)
                return String(id)
            }
            return 0
        } finally {
            // Releases the connection
            if (connection != null) connection.release()
        }
    }

    /**
     * Register device at first connection
     */
    static async registerDevice(_, {name = 'UnregisteredDevice', model_name = "Unknown", uid, firmware_version, sta_ssid, sta_pass}) {
        console.log("REGISTER Device")
        try {
            let _result = await this.insert({
                data: {
                    name,
                    uid,
                    model_name,
					firmware_version,
                    sta_ssid,
                    sta_pass,
                    user_id
                }
            })
            return this.getByID(_, {id: _result.insertId})
        } finally {
			console.log("Registered device");
        }
    }

    /**
     * Updates a device 
     */
    static async updateEntry(_, {id, name, model_name, uid, firmware_version, sta_ssid, sta_pass, status}) {
        console.log("Device Update...")
        try {
            await this.update(connection, {
                id,
                data: {
                    name,
                    model_name,
                    uid,
                    firmware_version,
                    sta_ssid,
                    sta_pass,
					status
                }
            })

            return this.getByID(_, {id})
        } finally {
			console.log("Updated device");
        }
    }
}

module.exports = Device