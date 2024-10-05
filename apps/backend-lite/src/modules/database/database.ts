// @ts-expect-error
import BetterSQLite3 from 'better-sqlite3';

export function createDatabase() {
	return new BetterSQLite3('db.sqlite');
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
