CREATE TABLE IF NOT EXISTS device (
	id				INTEGER PRIMARY KEY NOT NULL,
	uid				VARCHAR 16 UNIQUE NOT NULL,
	model_id		INTEGER NOT NULL,
	firmware_id		INTEGER NOT NULL,
	status			TEXT,
	description		TEXT,
	name			VARCHAR 32,
	when_created	INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (model_id) REFERENCES model(id)
	FOREIGN KEY (firmware_id) REFERENCES firmware(id)
);

CREATE INDEX device_idx1 ON device(uid);
