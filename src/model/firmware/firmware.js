const DAO = require('../../lib/dao')
const mySQLWrapper = require('../../lib/sqlWraper')
const fs = require('fs')
class Firmware extends DAO {

    /**
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'firmware'
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
        const connection = await mySQLWrapper.getConnectionFromPool()
        try {
            let _result = await this.delete(connection, {id})
            if (_result.affectedRows > 0)
            {
                console.log("DELETED firmware SUCCESS")
                console.log(_result)
                return (id)
            }
            return 0
        } finally {
            // Releases the connection
            if (connection != null) connection.release()
        }
    }

    /**
     * Uploads a new firmware
     */
    static async firmwareUpload(_, {model, version, filename, size}) {
        console.log("Upload Firmware")
        console.log(`Model: ${model}\nVersion: ${version}\nFilename: ${filename}\nsize: ${size}`)
        const connection = await mySQLWrapper.getConnectionFromPool()
        const firmware = await this.findMatching(_, {model, version, file: filename})
        if (firmware.length == 0)
        {
            try {
                console.log(`Model: ${model}\nVersion: ${version}\nFilename: ${filename}\nsize: ${size}`)
                let _result = await this.insert(connection, {
                    data: {
                        model,
                        version,
                        file: filename,
                        size
                    }
                })
    
                return this.getByID(_, {id: _result.insertId})
            } finally {
                // Releases the connection
                if (connection != null) connection.release()
            }
        }
        else
            return firmware[0];
    }
}

module.exports = Firmware