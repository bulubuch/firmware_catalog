const jsKeywords = [
	'await',
	'break',
	'case',
	'catch',
	'class',
	'const',
	'continue',
	'debugger',
	'default',
	'delete',
	'do',
	'else',
	'enum',
	'export',
	'extends',
	'false',
	'finally',
	'for',
	'function',
	'if',
	'implements',
	'import',
	'in',
	'instanceof',
	'interface',
	'let',
	'new',
	'null',
	'package',
	'private',
	'protected',
	'public',
	'return',
	'super',
	'switch',
	'static',
	'this',
	'throw',
	'try',
	'true',
	'typeof',
	'var',
	'void',
	'while',
	'with',
	'yield'
]

function isJSKW(word) {
	if (word in jsKeywords)
		return true
	return false
}

function snakeToPascalCase(snake) {
	return snake.match(/[a-z]+/gi)
	.map(function (word) {
		return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
	  })
	  .join('')
}

function error(message) {
	// console.error("Error occured");
	// console.error(message);
}


function spaceToSnakeCase(space) {
	let res = space.toLowerCase();
	let words = space.match(/ +/g)
	if (words) {
		words.forEach(word => {
			res = res.replace(word, "_");
		});
	}
	return res
}

function pluralize(word) {
	return word += "s";
}

function capitalize(string) {
	let res = string.toLowerCase();
	let words = res.match(/[a-z]+/g)
	if (words) {
		words.forEach(word => {
			res = res.replace(word,
				word.charAt(0).toUpperCase() +
				word.substr(1).toLowerCase());
		});
	}
	return res
}

/*
**	Object keys to comma separated values
*/

function keysToCsv(obj) {
	let csv = "";
	let count = 0;

	if (obj && typeof(obj == Object)) {
		for (const key of Object.keys(obj)) {
			if (count++) {
				csv += ", ";
			}
			csv += key;
		}
	}
	return csv
}

/*
**	Object keys to comma separated strings
*/

function keysToCss(obj) {
	let csv = "";
	let count = 0;

	if (obj && typeof(obj == Object)) {
		for (const key of Object.keys(obj)) {
			if (count++) {
				csv += ", ";
			}
			csv += `'${key}'`;
		}
	}
	return csv
}
let stringifyDepth = 0;

function stringifyArray(array, exceptedKeys) {
	if (exceptedKeys)
		exceptedKeys.push('undefined');
	stringifyDepth++
	let str = '[\n' + '\t'.repeat(stringifyDepth);
	let count = 0;
	let res = '';

	if (array) {
		array.forEach(item => {
			res = stringify(item);
			if (res) {
				if (count++)
					str += ",\n" + "\t".repeat(stringifyDepth)
				str += res;
			}
		})
		stringifyDepth--;
		str += '\n' + "\t".repeat(stringifyDepth) + ']';
		return str
	}
}

function stringifyObj(obj, exceptedKeys = []) {
	exceptedKeys.push('undefined');
	stringifyDepth++
	let str = '{\n' + '\t'.repeat(stringifyDepth);
	let count = 0;
	let res = '';

	if (obj) {
		for (let key in obj) {
			if (!(key in exceptedKeys) && obj.hasOwnProperty(key)) {
				res = stringify(obj[key]);
				if (res) {
					if (count++)
						str += ",\n" + "\t".repeat(stringifyDepth)
					str += `${key}: ${res}`;
				}
			}
		} 
		stringifyDepth--;
		str += '\n' + "\t".repeat(stringifyDepth) + '}';
		return str
	}
}

function stringify(obj, exceptedKeys) {
	if (typeof(obj) == 'string') {
		return `"${obj}"`;
	} else if (typeof(obj) == 'number') {
		return obj;
	} else if ( Array.isArray(obj)) {
		return stringifyArray(obj, exceptedKeys);
	} else if (typeof(obj) == 'object') {
		return stringifyObj(obj, exceptedKeys);
	} else if (typeof(obj) == 'boolean') {
		return (obj == true ? 'true' : 'false');
	} else if (typeof(obj) == 'function') {
		return null;
	} else if (obj === null) {
		return 'null';
	} else if (obj === undefined) {
		return null
	} else {
		console.log("STRINGIFY COULD NOT RECOGNIZE FOLOWING TYPE: ")
		return `${obj}`;
	}
}

module.exports.capitalize = capitalize;
module.exports.pluralize = pluralize;
module.exports.spaceToSnakeCase = spaceToSnakeCase;
module.exports.snakeToPascalCase = snakeToPascalCase;
module.exports.keysToCsv = keysToCsv;
module.exports.keysToCss = keysToCss;
module.exports.stringify = stringify;
module.exports.error = error;
module.exports.isJSKW = isJSKW;
