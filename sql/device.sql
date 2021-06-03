CREATE TABLE IF NOT EXISTS device(
	id					INTEGER PRIMARY KEY NOT NULL,
	uid					TEXT UNIQUE NOT NULL,
	model_name			TEXT NOT NULL,
	firmware_version	REAL NOT NULL,
	name				TEXT,
	status				TEXT NOT NULL DEFAULT "new",
	created_at			INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at			INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP
);
