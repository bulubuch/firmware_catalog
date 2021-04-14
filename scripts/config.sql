CREATE TABLE IF NOT EXISTS config (
	id				INTEGER PRIMARY KEY NOT NULL,
	firmware_id		INTEGER NOT NULL,
	version			REAL NOT NULL,
	description		TEXT,
	url				TEXT,
	when_created	INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (firmware_id) REFERENCES firmware(id)
);
