CREATE TABLE IF NOT EXISTS project(
	id				INTEGER PRIMARY KEY NOT NULL,
	user_id			INTEGER NOT NULL,
	name			TEXT UNIQUE NOT NULL,
	description		TEXT,
	shape			TEXT,
	address			TEXT,
	longitude		REAL,
	latitude		REAL,
	status			TEXT NOT NULL DEFAULT "new",
	created_at	INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at	INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP
);
