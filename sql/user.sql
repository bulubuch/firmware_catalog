CREATE TABLE IF NOT EXISTS user (
	id				INTEGER PRIMARY KEY NOT NULL,
	first_name		TEXT NOT NULL,
	last_name		TEXT NOT NULL,
	email			TEXT NOT NULL,
	password		TEXT NOT NULL,
	phone			TEXT,
	comments		TEXT,
	role			TEXT NOT NULL DEFAULT "user",
	status			TEXT DEFAULT "active",
	created_at	INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at	INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP
);
