const fs = require('fs')
const Base = require('./base')
class apiScaffold extends Base {
	static get sqlTypes() {
		return {
			string: "TEXT",
			integer: "INTEGER",
			double: "REAL",
			id: "INTEGER"
		}
	}
	static type(value) {
		return this.sqlTypes[value]
	}
	static unique(value) {
		if (value) {
			return "UNIQUE"
		}
		return ""
	}
	static required(value) {
		if (value) {
			return "NOT NULL"
		}
		return ""
	}
	static default(value) {
		if (value) {
			return `DEFAULT ${value}`
		}
		return ""
	}

	static processLine(name, options) {
		let res = `	${name} `;
		res += `${this.types(name)} `;
		res += `${this.unique(options.unique)} `;
		res += `${this.required(options.required)} `;
		res += `${this.default(options.default)},\n`
		return res
	}
	
	static scaffoldSchema(type) {
		return `const ${type.name}Queries = require('../model/${type.name}/queries')
		const ${type.name}Mutations = require('../model/${type.name}/mutations')
		
		module.exports = {
			create: ${type.name}Mutations.create_${this.capitalize(type.name)},
			delete: ${type.name}Mutations.delete_${this.capitalize(type.name)},
			update: ${type.name}Mutations.update_${this.capitalize(type.name)},
			search: ${type.name}Queries.search_${this.capitalize(type.name)},
		}`;

	}

	static scaffoldQuery(type) {
		return `const type = require('./type')
		const ${this.capitalize(type.name)} = require("./${type.name}")
		
		// Defines the queries
		module.exports = {
			${type.name}s: {
				type: Array,
				args: {
					${this.fieldsToStr(type.fields)}
				},
				resolve: ${this.capitalize(type.name)}.findMatching.bind(${this.capitalize(type.name)})
			},
			${type.name}: {
				type,
				args: {
					id: {
						type: Number,
						non_null: true
					}
				},
				resolve: ${this.capitalize(type.name)}.getByID.bind(${this.capitalize(type.name)})
			}
		}`;
	}

	static scaffoldMutation(type) {
		return `
		const type = require('./type')
		const ${this.capitalize(type.name)} = require('./${type.name}')
		
		// Defines the mutations
		module.exports = {
			create${this.capitalize(type.name)}: {
				type,
				args: {
					${this.fieldsToStr(type.fields)}
				},
				resolve: ${this.capitalize(type.name)}.create${this.capitalize(type.name)}.bind(${this.capitalize(type.name)})
			},
			update${this.capitalize(type.name)}: {
				type,
				args: {
					${this.fieldsToStr(type.fields)}
				},
				resolve: ${this.capitalize(type.name)}.update${this.capitalize(type.name)}.bind(${this.capitalize(type.name)})
			},
			delete${this.capitalize(type.name)}: {
				type: String,
				args: {
					id:					{ type: Number }
				},
				resolve: ${this.capitalize(type.name)}.delete${this.capitalize(type.name)}.bind(${this.capitalize(type.name)})
			}
		}`
	}

	static scaffoldClass(type) {
		return `const DAO = require('../../lib/dao')
		const config = require('../../../config/app-settings');
		const type = require('./type.js');
		
		class ${this.capitalize(type.name)} extends DAO {
		
			/**
			 * Overrides TABLE_NAME with this class' backing table at MySQL
			 */
			static get TABLE_NAME() {
				return '${type.name}'
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
		
			static async delete${this.capitalize(type.name)}(_, {id}) {
				console.log("DELETED ${this.capitalize(type.name)}")
				try {
					let _result = await this.delete(id)
					return _result
				} catch(err) {
					return err
				} finally {
					console.log("${this.capitalize(type.name)} Deleted");
				}
			}
		
			/**
			 * Create a new ${type.name}
			 */
			static async create${this.capitalize(type.name)}(_, {${this.modelFields(type.fields)}}) {
				console.log("Upload ${this.capitalize(type.name)}")
				try {
					let _result = await this.insert({
						data: {
							${this.modelFields(type.fields)}
						}
					})
					return this.getByID(_, {id: _result.insertId})
				} catch (err) {
					return (err)
				} finally {
					console.log("Created ${this.capitalize(type.name)}");
				}
			}
			
			/**
			 * Updates a ${type.name} 
			 */
			 static async update${this.capitalize(type.name)}(_, {id, ${this.modelFields(type.fields)}}) {
				console.log("${this.capitalize(type.name)} Update...")
				try {
					await this.update({
						id,
						data: {
							${this.modelFields(type.fields)}
						}
					});
		
					return this.getByID(_, {id})
				} catch (err) {
					console.log(err);
					return (err);
				} finally {
					console.log("Updated ${this.capitalize(type.name)}");
				}
			}
		}
		
		module.exports = ${this.capitalize(type.name)}`;

	}

	static scaffoldRoute(type) {
		return `const router = require('express').Router()
		const schema = require('../schema/${type.name}')
		
		
		router.get('/', (req, res) => {
			schema.search.resolve(res, req.query)
			.then((result) => {
				res.send(result);
			});
		});
		
		router.post('/', (req, res) => {
			schema.register.resolve(res, req.body)
			.then((result) => {
				res.send(result);
			});
		});
		
		router.delete('/', (req, res) => {
			schema.delete.resolve(res, req.body)
			then((result) => {
				res.send(result);
			});
		});
		
		router.put('/', (req, res) => {
			schema.update.resolve(res, req.body)
			.then((result) => {
				res.send(result);
			});
		});
		
		module.exports = router`;
	}

	static scaffoldModel(type, output_dir) {
		let dir = `${output_dir}/src/model/${type.name}`;
		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}
		fs.writeFile(`${dir}/mutations.js`, this.scaffoldMutation(type), this.error);
		fs.writeFile(`${dir}/queries.js`, this.scaffoldQuery(type), this.error);
		fs.writeFile(`${dir}/${type.name}.js`, this.scaffoldClass(type), this.error);
	}

	static scaffold(type, output_dir) {
		fs.writeFile(`${output_dir}/src/routes/${type.name}.js`, this.scaffoldRoute(type), this.error);
		fs.writeFile(`${output_dir}/src/schema/${type.name}.js`, this.scaffoldSchema(type), this.error);
		this.scaffoldModel(type, output_dir);
	}
}
 module.exports = apiScaffold;