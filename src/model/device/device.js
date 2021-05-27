const DAO = require('../../lib/dao')
const config = require('../../../config/app-settings');
const type = require('./type.js');

class Device extends DAO {

    /**
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'device'
    }

	static get type() {
		return type
	}

    /**
     * Returns a device by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

	/**
     * Returns a device by its UID
     */
	 static async getByUID(_, uid) {
        return await this.findByFields({fields:{uid: uid}});
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
			return _result
		} catch(err) {
			return err
		} finally {
			console.log("Device Deleted");
        }
    }

    /**
     * Register device at first connection
     */
    static async registerDevice(_, {name = 'UnregisteredDevice', model_name = "Unknown", uid, firmware_version}) {
        console.log("REGISTER Device")
        try {
            let _result = await this.insert({
                data: {
                    name,
                    uid,
                    model_name,
					firmware_version
                }
            })
            return this.getByID(_, {id: _result.insertId})
        } catch (err) {
			return (err)
		} finally {
			console.log("Registered device");
        }
    }

    /**
     * Updates a device 
     */
    static async updateEntry(_, {id, name, model_name, firmware_version, status}) {
        console.log("Device Update...")
        try {
            await this.update({
                id,
                data: {
                    name,
                    model_name,
                    firmware_version,
					status
                }
			});

            return this.getByID(_, {id})
		} catch (err) {
			console.log(err);
			return (err);
        } finally {
			console.log("Updated device");
        }
    }
}

module.exports = Device