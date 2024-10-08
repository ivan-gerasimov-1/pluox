// @ts-expect-error
import BetterSQLite3 from 'better-sqlite3';
// import { DatabaseSync as BetterSQLite3 } from 'node:sqlite';

const DATABASE_FILE = 'db.sqlite';

export function createDatabase() {
	return new BetterSQLite3(DATABASE_FILE);
}

export function initializeDatabase() {
	let db = createDatabase();

	try {
		db.exec(`
			CREATE TABLE IF NOT EXISTS users (
				id TEXT PRIMARY KEY,
				email TEXT NOT NULL,
				password TEXT NOT NULL
			)
		`);
	} catch (error) {
		console.log(error);
	}

	return db;
}
