// @ts-expect-error
import SQLite from 'better-sqlite3';
// import { DatabaseSync as SQLite } from 'node:sqlite';

import type {
	IDatabase,
	TInitializeDatabaseParams,
} from '#app/modules/database/types';

export function createDatabase(filename: string): IDatabase {
	return new SQLite(filename);
}

export function initializeDatabase(
	params: TInitializeDatabaseParams,
): IDatabase {
	let db = createDatabase(params.filename);

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
