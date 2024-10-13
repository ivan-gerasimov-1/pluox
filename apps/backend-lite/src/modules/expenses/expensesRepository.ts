import type { Database } from 'better-sqlite3';

export type TExpenseSchema = {
	id: string;
	userId: string;
	createdAt: string;
	modifiedAt: string;
};

export type TExpenseCreateDTO = {
	id: string;
	userId: string;
	createdAt: string;
	modifiedAt: string;
};

const enum EExpensesSQLQuery {
	CREATE = 'INSERT INTO expenses (id, userId, createdAt, modifiedAt) VALUES (:id, :userId, :createdAt, :modifiedAt)',
	ONE_BY_ID = 'SELECT id, userId, amount, description FROM expenses WHERE id = ?',
	ALL = 'SELECT id, userId, amount, description FROM expenses',
}

export class ExpensesRepository {
	readonly #database: Database;

	constructor(database: Database) {
		this.#database = database;
	}

	public async createExpense(expense: TExpenseCreateDTO): Promise<void> {
		let expenseCreateStatement = this.#database.prepare<[TExpenseSchema]>(
			EExpensesSQLQuery.CREATE,
		);

		try {
			expenseCreateStatement.run({
				id: expense.id,
				userId: expense.userId,
				createdAt: expense.createdAt,
				modifiedAt: expense.modifiedAt,
			});
		} catch (error) {
			throw new Error('Unable to create expense', {
				cause: error,
			});
		}
	}

	public async getExpenses(): Promise<[]> {
		return [];
	}
}
