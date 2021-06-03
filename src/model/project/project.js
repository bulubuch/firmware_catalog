const DAO = require('../../lib/dao/sqlite')
const config = require('../../../config/app-settings');
const type = require('./type.js');

class Project extends DAO {

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

    static async deleteProject(_, {id}) {
        console.log("DELETED Project")
        try {
            let _result = await this.delete(id)
			return _result
		} catch(err) {
			return err
		} finally {
			console.log("Project Deleted");
        }
    }

    /*
     * Create a new project
     */
    static async createProject(_, {user_id, name, descriprion, shape, address, longitude, latitude, status}) {
        console.log("Upload Project")
        try {
            let _result = await this.insert({
                data: {
					user_id,
					name,
					descriprion,
					shape,
					address,
					longitude,
					latitude,
					status
				}
            })
            return this.getByID(_, {id: _result.insertId})
        } catch (err) {
			return (err)
		} finally {
			console.log("Registered Project");
        }
    }
	
    /*
     * Updates a project 
     */
	 static async updateEntry(_, {id, user_id, name, descriprion, shape, address, longitude, latitude, status}) {
        console.log("Project Update...")
        try {
            await this.update({
                id,
                data: {
					user_id,
					name,
					descriprion,
					shape,
					address,
					longitude,
					latitude,
					status
                }
			});

            return this.getByID(_, {id})
		} catch (err) {
			console.log(err);
			return (err);
        } finally {
			console.log("Updated Project");
        }
    }
}

module.exports = Project