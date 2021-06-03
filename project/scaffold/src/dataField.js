const dataType = require('./dataType')
const utils = require('./utils')

class dataField {
	unique = false;
	required = false;

	constructor(name, {type, required, unique, default_value, primary}) {
		this.name = name;
		this.type = type;
		this.js_type = require('./dataType')[type]._js;
		this.required = required;
		this.primary = primary;
		this.unique = unique;
		this.default_value = default_value;
	}

	get sqlite() {
		let params = "";
		if (this.primary) params += ` PRIMARY KEY`;
		if (this.unique) params += ` UNIQUE`;
		if (this.required) params += ` NOT NULL`;
		if (!(this.default_value === undefined)) params += ` DEFAULT ${this.type.defaultToSqlite()}`;
		return `${this.name} ${this.type._sqlite_type} ${params}`;
	}

	stringify() {
		return utils.stringify({
			
		});

	}
}

function compose(fields) {
	let res = {};

	for (const name in fields) {
		if (utils.isJSKW(name)) {
			throw new Error(`Could not process field: '${name}' because it is a JavaScript keyword`)			
		}
		res[name] = new dataField(name, fields[name]);
	}
	return res
}

module.exports.dataField = dataField
module.exports.compose = compose