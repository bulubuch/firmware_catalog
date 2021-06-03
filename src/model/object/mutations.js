
		const type = require('./type')
		const Object = require('./object')
		
		// Defines the mutations
		module.exports = {
			createObject: {
				type,
				args: {
					project_id: {type:"id", unique: true, required: true, default: undefined},
			name: {type:"string", unique: true, required: true, default: undefined},
			type: {type:"string", required: true, default: "generic"},
			visible: {type:"integer", required: true, default: true},
			status: {type:"string", required: true, default: "new"},
			created_at: {type:"date", required: true, default: "now"},
			updated_at: {type:"date", required: true, default: "now"}
				},
				resolve: Object.createObject.bind(Object)
			},
			updateObject: {
				type,
				args: {
					project_id: {type:"id", unique: true, required: true, default: undefined},
			name: {type:"string", unique: true, required: true, default: undefined},
			type: {type:"string", required: true, default: "generic"},
			visible: {type:"integer", required: true, default: true},
			status: {type:"string", required: true, default: "new"},
			created_at: {type:"date", required: true, default: "now"},
			updated_at: {type:"date", required: true, default: "now"}
				},
				resolve: Object.updateObject.bind(Object)
			},
			deleteObject: {
				type: String,
				args: {
					id:					{ type: Number }
				},
				resolve: Object.deleteObject.bind(Object)
			}
		}