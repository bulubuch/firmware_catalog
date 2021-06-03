const dataField = require('./datafield');
const utils = require('./utils');
const apiT = require('../templates/api/template');
const path = require('path');
const influx = require('influx')
const fs = require('fs');

class dataModel {
	common_fields = {
		id: {type: "id", required: true, unique: true, primary: true},
		created_at: {type: "date", required: true, default: "now"},
		updated_at: {type: "date", required: true, default: "now"},
		deleted_at: {type: "date"},
	};

	constructor(name, {storrage, fields, admin_only}) {
		this.name = utils.spaceToSnakeCase(name);
		this.storrage = storrage;
		this.admin_only = admin_only;
		this.own_fields = dataField.compose(fields);
	}

	get fields() {
		let obj = {
			id: this.common_fields.id,
		}
		for (const field in this.own_fields) {
			obj[field] = this.own_fields[field]
		}
		obj.created_at = this.common_fields.created_at;
		obj.updated_at = this.common_fields.updated_at;
		obj.deleted_at = this.common_fields.deleted_at;
		return obj;
	}

	stringify() {
		return utils.stringify({
			name: this.name,
			storrage: this.storrage,
			fields: this.fields
		});
	}

	prepare(storrage) {
		if (storrage.type == 'influx') {
			let fields = {}
			let tags = []
			for (const name in this.fields) {
				if (this.fields[name].type == 'tag') { tags.push(name)}
				else if (this.fields[name].type == 'integer') {
					fields[name] = influx.FieldType.INTEGER
				} else if (this.fields[name].type == 'string') {
					fields[name] = influx.FieldType.STRING
				} else if (this.fields[name].type == 'double') {
					fields[name] = influx.FieldType.FLOAT
				} else if (this.fields[name].type == 'boolean') {
					fields[name] = influx.FieldType.BOOLEAN
				}
			}
			this.schema = {
				measurement: this.name,
				fields,
				tags
			}
		}
	}

	scaffold(dest_path) {
		let dir = path.join(dest_path, 'models', this.name);
		if (!fs.existsSync(dir)){ fs.mkdirSync(dir); }
		fs.writeFile(
			path.join(dest_path, 'routes', `${this.name}.js`),
			apiT.route(this), utils.error);
		fs.writeFile(
			path.join(dest_path, 'schemas', `${this.name}.js`),
			apiT.schema(this), utils.error);
		fs.writeFile(
			path.join(dest_path, 'models', this.name, `${this.name}.js`),
			apiT.model(this), utils.error);
		fs.writeFile(
			path.join(dest_path, 'models', this.name, `queries.js`),
			apiT.queries(this), utils.error);
		fs.writeFile(
			path.join(dest_path, 'models', this.name, `mutations.js`),
			apiT.mutations(this), utils.error);
		fs.writeFile(
			path.join(dest_path, 'models', this.name, `${this.name}.sql`),
			apiT.sqlite(this), utils.error);
		fs.writeFile(
			path.join(dest_path, 'models', this.name, `type.js`),
			apiT.type(this), utils.error);
	}

	// prepare(storrages, dest_path, template_path) {
	// 	for (const name in storrages) {
	// 		storrages[name].prepare(this.dest_path, template_path)
	// 	}
		// let dir = path.join(dest_path, 'lib', 'dao', this.name + '.js');
	
		// if (!fs.existsSync(dir)) { fs.mkdirSync(dir); }
		// for (const name in this.fields) {
		// 	if (!fs.existsSync(dir)) {
		// 		fs.writeFile(
		// 			path.join(dest_path, 'models', this.name, `type.js`),
		// 			apiT.type(this), utils.error);
		// 		// console.log("preparing storrage for model " + this.name);
		// 	this.fields[name].storrage
		// }
	// }
}


function compose(models) {
	let res = {};

	for (const name in models) {
		res[name] = new dataModel(name, models[name]);
	}
	return res
}

module.exports.dataModel = dataModel;
module.exports.compose = compose;