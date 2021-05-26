CREATE TABLE IF NOT EXISTS user (
	id				INTEGER PRIMARY KEY NOT NULL,
	first_name		TEXT NOT NULL,
	last_name		TEXT NOT NULL,
	email			TEXT NOT NULL,
	phone			TEXT,
	comments		TEXT,
	status			TEXT,
	role			TEXT NOT NULL DEFAULT "user",
	created_at	INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP
);
