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
				id VARCHAR(36) PRIMARY KEY,
				email TEXT NOT NULL,
				password TEXT NOT NULL
			)
		`);
		db.exec(`
			CREATE TABLE IF NOT EXISTS expenses (
				id VARCHAR(36) PRIMARY KEY,
				userId VARCHAR(36) NOT NULL,
				createdAt DATETIME NOT NULL,
				modifiedAt DATETIME NOT NULL,
				FOREIGN KEY (userId) REFERENCES users(id)
			)
		`);
	} catch (error) {
		console.log(error);
	}

	return db;
}
