const fs = require('fs')
const Base = require('./base')
class cliScaffold extends Base {
	static scaffoldController(type) {
		return `const helpers = require("../utils/helpers");
		const ${this.capitalize(type.name)} = require('../models/${type.name}');
		
		exports.view = (req, res) => {
			${this.capitalize(type.name)}.findAll().then(result => {
				let columns = ${this.capitalize(type.name)}.columns;
				res.render('${type.name}', {
					rows: result,
					columns:columns,
					helpers
				});
			}).catch(err => {
				console.log(err);
				res.status(500).send(err);
			});
		};`;
	}

	static scaffoldModel(type) {
		return `const modulabClient = require('../utils/modulabClient')

		class ${this.capitalize(type.name)} {
			static get columns() {
				return 
					${this.modelFieldsStr(type.fields)}
				]
					
			}
			static findAll() {
				return modulabClient.get('/${type.name}');
			}
		}
		
		module.exports = ${this.capitalize(type.name)};
		`;
	}

	static scaffoldView(type) {
		return `{{> tablebox rows=rows columns=columns title="${this.capitalize(type.name)}"}}`;
	}

	static scaffold(type, output_dir) {
		fs.writeFile(`${output_dir}/views/${type.name}.hbs`, this.scaffoldView(type), this.error);
		fs.writeFile(`${output_dir}/models/${type.name}.js`, this.scaffoldModel(type), this.error);
		fs.writeFile(`${output_dir}/controllers/${type.name}.js`, this.scaffoldController(type), this.error);
	}
}
 module.exports = cliScaffold;