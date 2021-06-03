const database = require('sqlite3').verbose();
const fs = require('fs')
class sqlScaffold {
	static get sqlTypes() {
		return {
			string: "TEXT",
			integer: "INTEGER",
			boolean: "INTEGER",
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
			return "UNIQUE "
		}
		return ""
	}
	static required(value) {
		if (value) {
			return "NOT NULL "
		}
		return ""
	}
	static default(type, value) {
		if (value) {
			if (type == "string") return `DEFAULT '${value}'`
			else if (type == "date" && value == "now"){
				return `DEFAULT CURRENT_TIMESTAMP`
			}
		}
		return ""
	}

	static processLine(name, options) {
		let res = `	${name} `;
		res += `${this.type(options.type)} `;
		res += `${this.unique(options.unique)}`;
		res += `${this.required(options.required)}`;
		res += `${this.default(options.type, options.default)}`
		return res
	}
	
	static scaffold(obj, output_dir) {
		let db = new database.Database(obj.database.filename);
		let file = `CREATE TABLE IF NOT EXISTS ${obj.type.name}(\n`;
		let count = 0;
		file += `	id INTEGER PRIMARY KEY NOT NULL,\n`;
		console.log("Generating SQL File for type");
		console.log(obj.type);
		for (const [key, value] of Object.entries(obj.type.fields)) {
			file += this.processLine(key, value);
			if (++count < Object.keys(obj.type.fields).length) {
				file += ",\n";
			}
		}
		file += '\n);';
		fs.writeFile(`${output_dir}/sql/${obj.type.name}.sql`, file, err => {
			if (err) console.log("error: " + err);
		})
		db.run(file);
	}
}
 module.exports = sqlScaffold;