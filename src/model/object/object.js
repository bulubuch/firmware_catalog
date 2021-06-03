const DAO = require('../../lib/dao/sqlite')
		const config = require('../../../config/app-settings');
		const type = require('./type.js');

		function isEmpty(obj) {
			for(var prop in obj) {
				if(obj.hasOwnProperty(prop))
					return false;
			}
			return true;
		}

		class Object extends DAO {
		
			/*
			 * Overrides TABLE_NAME with this class' backing table at MySQL
			 */
			static get TABLE_NAME() {
				return 'object'
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
				if (isEmpty(fields)) return this.findAll()
				
				// Find matching models
				return this.findByFields({
					fields
				})
			}
		
			static async deleteObject(_, {id}) {
				console.log("DELETED Object")
				try {
					let _result = await this.delete(id)
					return _result
				} catch(err) {
					return err
				} finally {
					console.log("Object Deleted");
				}
			}
		
			/*
			 * Create a new object
			 */
			static async createObject(_, {project_id, name, type, visible, status, created_at, updated_at, }) {
				console.log("Upload Object")
				try {
					let _result = await this.insert({
						data: {
							project_id, name, type, visible, status, created_at, updated_at, 
						}
					})
					return this.getByID(_, {id: _result.insertId})
				} catch (err) {
					return (err)
				} finally {
					console.log("Created Object");
				}
			}
			
			/*
			 * Updates a object 
			 */
			 static async updateObject(_, {id, project_id, name, type, visible, status, created_at, updated_at, }) {
				console.log("Object Update...")
				try {
					await this.update({
						id,
						data: {
							project_id, name, type, visible, status, created_at, updated_at, 
						}
					});
		
					return this.getByID(_, {id})
				} catch (err) {
					console.log(err);
					return (err);
				} finally {
					console.log("Updated Object");
				}
			}
		}
		
		module.exports = Object