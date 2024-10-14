import type { Database } from 'better-sqlite3';

export type IDatabase = Database;

export type TInitializeDatabaseParams = {
	filename: string;
};
