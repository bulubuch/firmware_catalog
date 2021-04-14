CREATE TABLE IF NOT EXISTS firmware (
	id				INTEGER PRIMARY KEY NOT NULL,
	model_id		INTEGER NOT NULL,
	version			INTEGER DEFAULT 0,
	description		TEXT,
	url				TEXT,
	when_created	INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (model_id) REFERENCES model(id)
);

CREATE INDEX firmware_idx1 ON firmware(version);