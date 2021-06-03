class dataType {
	constructor(name) {
		this.name = name;
	}
}

class id extends dataType {
	static _description = "Entry ID";
	static _sqlite_type = "INTEGER";
	static _js = Number;

	constructor(name) {
		super(name);
	}
}

class tag extends dataType {
	static _description = "Influx tag";
	static _sqlite_type = "STRING";
	static _js = Number;

	constructor(name) {
		super(name);
	}
}

class string extends dataType {
	static _description = "character string";
	static _sqlite_type = "TEXT";
	static _js = String;

	constructor(name) {
		super(name);
	}
}

class integer extends dataType {
	static _description = "whole number";
	static _sqlite_type = "INTEGER";
	static _js = String;

	constructor(name) {
		super(name);
	}
}

class double extends dataType {
	static _description = "decimal number";
	static _sqlite_type = "REAL";
	static _js = Number;

	constructor(name) {
		super(name);
	}
}

class timestamp extends dataType {
	static _description = "Timestamp";
	static _sqlite_type = "INTEGER";
	static _js = Date;

	constructor(name) {
		super(name);
	}

	defaultToSqlite() {
		if (this.default == "now") {
			return `CURRENT_TIMESTAMP`;
		} else {
			return `${this.default}`
		}
	}
}

class email extends dataType {
	static _description = "email";
	static _sqlite_type = "TEXT";
	static _js = String;

	constructor(name) {
		super(name);
	}
}

class boolean extends dataType {
	static _description = "Boolean";
	static _sqlite_type = "INTEGER";
	static _js = Number;

	constructor(name) {
		super(name);
	}
}

class password extends dataType {
	static _description = "hashed password";
	static _sqlite_type = "TEXT";
	static _js = String;

	constructor(name) {
		super(name);
	}
}

class has_one extends dataType {
	static _description = "Reference to an other model";
	static _sqlite_type = "INTEGER";
	static _js = Object;

	constructor(name) {
		super(name);
	}
}

class has_many extends dataType {
	static _description = "Reference to many other models";
	static _sqlite_type = "string";
	static _js = Array;

	constructor(name) {
		super(name);
	}

}

class belongs_to_one extends dataType {
	static _description = "Is referenced by one other model";
	static _sqlite_type = "string";
	static _js = Object;

	constructor(name) {
		super(name);
	}
}

class belongs_to_many extends dataType {
	static _description = "Is referenced by many other models";
	static _sqlite_type = "string";
	static _js = Object;

	constructor(name) {
		super(name);
	}
}

module.exports.id = id;
module.exports.string = string;
module.exports.tag = tag;
module.exports.integer = integer;
module.exports.double = double;
module.exports.timestamp = timestamp;
module.exports.has_one = has_one;
module.exports.has_many = has_many;
module.exports.belongs_to_one = belongs_to_one;
module.exports.belongs_to_many = belongs_to_many;
module.exports.email = email;
module.exports.password = password;
module.exports.boolean = boolean;
