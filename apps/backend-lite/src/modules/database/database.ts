import { DatabaseSync } from 'node:sqlite';

export function createDatabase() {
	return new DatabaseSync(':memory:');
}

export function initializeDatabase() {
	let db = createDatabase();

	try {
		db.exec(`
			create table if not exists contacts (
					 id integer primary key,
					 username text not null
			)`);
	} catch (error) {
		console.log(error);
	}

	return db;
}
