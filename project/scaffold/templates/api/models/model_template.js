const utils = require('../../../src/utils')

module.exports = ({name, fields, storrage}) => {
	const capi = utils.capitalize(name);
	const plural = utils.pluralize(name);
	const csvFieldKeys = utils.keysToCsv(fields);
	const strFields = utils.stringify(fields);

	return `const ${storrage.name}DAO = require('../../lib/dao/${storrage.name}')
const config = require('../../../config/app-settings');
const type = require('./type.js');

class ${capi} extends ${storrage.name}DAO {

	static db = this.getDatabase('${storrage.db}')
    /*
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return '${name}'
    }

	static get type() {
		return type
	}

    /*
     * Returns a ${name} by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /*
     * Returns a list of ${plural} matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields) {
        // Returns early with all ${plural} if no criteria was passed
        if (Object.keys(fields).length === 0) return this.findAll(this.db)
        
        // Find matching ${plural}
        return this.findByFields(db, {
            fields
        })
    }

    static async delete${capi}(_, id) {
        console.log("DELETED ${capi}")
        try {
            let _result = await this.delete(this.db, id)
			return _result
		} finally {
			console.log("${capi} Deleted");
        }
    }

    /*
     * Create ${name} at first connection
     */
    static async create${capi}(_, {${csvFieldKeys}}) {
        console.log("Creating ${capi}")
        try {
            let _result = await this.insert({
                data: ${strFields}
            })
            return this.getByID(_, {id: _result})
		} finally {
			console.log("Createed ${name}");
        }
    }

    /*
     * Updates a ${name} 
     */
    static async update${capi}(_, {${csvFieldKeys}}) {
        console.log("${capi} Update...")
        try {
            await this.update({
                id,
                data: {${csvFieldKeys}}
			});

            return this.getByID(_, {id})
        } finally {
			console.log("Updated ${name}");
        }
    }
}

module.exports = ${capi}`
}