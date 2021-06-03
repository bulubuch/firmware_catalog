const modulabClient = require('../utils/modulabClient')

		class Object {
			static get columns() {
				return 
					["project_id", "name", "type", "visible", "status", "created_at", "updated_at", ]
				]
					
			}
			static findAll() {
				return modulabClient.get('/object');
			}
		}
		
		module.exports = Object;
		