CREATE TABLE IF NOT EXIST object(
	id INTEGER PRIMARY KEY NOT NULL,	name undefined UNIQUE NOT NULL ,
	type undefined  NOT NULL DEFAULT generic,
	status undefined  NOT NULL DEFAULT new,
	created_at undefined  NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at undefined  NOT NULL DEFAULT CURRENT_TIMESTAMP,
);