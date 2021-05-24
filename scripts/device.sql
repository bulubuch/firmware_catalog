CREATE TABLE IF NOT EXISTS device(
	id				INTEGER PRIMARY KEY NOT NULL,
	name			TEXT UNIQUE NOT NULL,
	description		TEXT,
	manufacturer	TEXT,
	datasheet		TEXT,
	when_created	INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP
);