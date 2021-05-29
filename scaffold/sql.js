const fs = require('fs')
class sqlScaffold {
	static get sqlTypes() {
		return {
			string: "TEXT",
			integer: "INTEGER",
			double: "REAL",
			date: "INTEGER",
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
	static default(type, value) {
		if (value) {
			if (type == "string") return `DEFAULT ${value}`
			else if (type == "date" && value == "now"){
				return `DEFAULT CURRENT_TIMESTAMP`
			}

			else if (type == "string") return `DEFAULT ${value}`
		}
		return ""
	}

	static processLine(name, options) {
		let res = `	${name} `;
		res += `${this.type(name)} `;
		res += `${this.unique(options.unique)} `;
		res += `${this.required(options.required)} `;
		res += `${this.default(options.type, options.default)},\n`
		return res
	}
	
	static scaffold(type, output_dir) {
		let file = `CREATE TABLE IF NOT EXIST ${type.name}(\n`;
		let count = 0;
		file += `	id INTEGER PRIMARY KEY NOT NULL,`;
		console.log("Generating SQL File for type");
		console.log(type);
		for (const [key, value] of Object.entries(type.fields)) {
			file += this.processLine(key, value);
			if (++count < type.fields.length) {
				file += ",\n";
			}
		}
		file += ');';
		fs.writeFile(`${output_dir}/sql/${type.name}.sql`, file, err => {
			if (err) console.log("error: " + err);
		})
	}
}
 module.exports = sqlScaffold;