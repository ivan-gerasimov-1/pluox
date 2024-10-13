import type { Database } from 'better-sqlite3';

const enum EExpensesSQLQuery {
	CREATE = 'INSERT INTO expenses (id, userId, amount, description) VALUES (:id, :userId, :amount, :description)',
	ONE_BY_ID = 'SELECT id, userId, amount, description FROM expenses WHERE id = ?',
	ALL = 'SELECT id, userId, amount, description FROM expenses',
}

export class ExpensesRepository {
	readonly #database: Database;

	constructor(database: Database) {
		this.#database = database;
	}

	public async getExpenses(): Promise<[]> {
		return [];
	}
}
