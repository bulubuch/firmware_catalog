const DAO = require('../../lib/dao/sqlite')
const config = require('../../../config/app-settings');
const type = require('./type.js');

class User extends DAO {

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
     * Returns a model by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /*
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

    static async deleteUser(_, {id}) {
        console.log("DELETED User")
        try {
            let _result = await this.delete(id)
			return _result
		} catch(err) {
			return err
		} finally {
			console.log("User Deleted");
        }
    }

    /*
     * Register a new user
     */
    static async registerUser(_, {first_name, last_name, email, phone, comments, role, status}) {
        console.log("Upload User")
        try {
            let _result = await this.insert({
                data: {
					first_name,
					last_name,
					email,
					phone,
					comments,
					role,
					status
				}
            })
            return this.getByID(_, {id: _result.insertId})
        } catch (err) {
			return (err)
		} finally {
			console.log("Registered User");
        }
    }
	
    /*
     * Updates a user 
     */
	 static async updateEntry(_, {id, first_name, last_name, email, phone, comments, role, status}) {
        console.log("User Update...")
        try {
            await this.update({
                id,
                data: {
					first_name,
					last_name,
					email,
					phone,
					comments,
					role,
					status
                }
			});

            return this.getByID(_, {id})
		} catch (err) {
			console.log(err);
			return (err);
        } finally {
			console.log("Updated User");
        }
    }
}

module.exports = User