const DAO = require('../../lib/dao')
		const config = require('../../../config/app-settings');
		const type = require('./type.js');

		function isEmpty(obj) {
			for(var prop in obj) {
				if(obj.hasOwnProperty(prop))
					return false;
			}
			return true;
		}

		class Project_object extends DAO {
		
			/**
			 * Overrides TABLE_NAME with this class' backing table at MySQL
			 */
			static get TABLE_NAME() {
				return 'project_object'
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
				if (isEmpty(fields)) return this.findAll()
				
				// Find matching models
				return this.findByFields({
					fields
				})
			}
		
			static async deleteProject_object(_, {id}) {
				console.log("DELETED Project_object")
				try {
					let _result = await this.delete(id)
					return _result
				} catch(err) {
					return err
				} finally {
					console.log("Project_object Deleted");
				}
			}
		
			/**
			 * Create a new project_object
			 */
			static async createProject_object(_, {project_id, name, type, visible, status, created_at, updated_at, }) {
				console.log("Upload Project_object")
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
					console.log("Created Project_object");
				}
			}
			
			/**
			 * Updates a project_object 
			 */
			 static async updateProject_object(_, {id, project_id, name, type, visible, status, created_at, updated_at, }) {
				console.log("Project_object Update...")
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
					console.log("Updated Project_object");
				}
			}
		}
		
		module.exports = Project_object