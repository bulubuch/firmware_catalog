CREATE TABLE IF NOT EXISTS device_component (
	id					INTEGER PRIMARY KEY NOT NULL,
	device_id			INTEGER NOT NULL,
	model_name			TEXT NOT NULL,
	type				TEXT,
	builtin				INTEGER DEFAULT 0,
	active				INTEGER DEFAULT 1,
	when_created		INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (device_id) REFERENCES device(id)
);
