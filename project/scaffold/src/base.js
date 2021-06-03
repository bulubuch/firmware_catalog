const fs = require('fs')
class base {
	static snakeToCamel(str) {
		console.log("SNAKE TO CAMEL ");
		console.log(str);
		let res = str.replace(
			/([-_][a-z])/,
			(group) => group.toUpperCase()
						.replace('-', '')
						.replace('_', '')
		);
		console.log(res);
		return res
	}

	static capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	static fieldsToStr(fields) {
		let res = '';
		let count = 0;

		for (const [field, props] of Object.entries(fields)) {
			res += `${field}: {type:"${props.type}"`;
			if (props.unique) { res += `, unique: ${props.unique}`};
			if (props.required) { res += `, required: ${props.required}`};
			if (typeof(props.default) == 'string') {
				res += `, default: "${props.default}"`;
			} else  {
				res += `, default: ${props.default}`;
			}
			res += '}';
			if (++count < Object.keys(fields).length) {
				res += `,\n\t\t\t`;
			}
		}
		return res
	}

	static error(err)
	{
		if (err)
			console.log("Error: " + err);
	}

	static modelFields(fields) {
		let res = "";

		for (const [key, value] of Object.entries(fields)) {
			res += key + ', ';
		}
		return res
	}

	static modelFieldsStr(fields) {
		let res = "[";

		for (const [key, value] of Object.entries(fields)) {
			res += `"${key}", `;
		}
		res += "]";
		return res
	}

}
 module.exports = base;