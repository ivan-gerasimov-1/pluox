import type { Database } from 'better-sqlite3';

export type TExpenseSchema = {
	id: string;

	userId: string;

	createdAt: string;
	modifiedAt: string;

	amount: number;
	currency: string;
	comment: string | null;
	category: string;
	date: string;
};

export type TExpenseCreateDTO = TExpenseSchema;

const enum EExpensesSQLQuery {
	CREATE = `
		INSERT INTO expenses (
			id,

			userId,

			createdAt,
			modifiedAt,

			amount,
			currency,
			comment,
			category,
			date
		)
		VALUES (
			:id,

			:userId,

			:createdAt,
			:modifiedAt,

			:amount,
			:currency,
			:comment,
			:category,
			:date
		)
	`,
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

				amount: expense.amount,
				currency: expense.currency,
				comment: expense.comment,
				category: expense.category,
				date: expense.date,
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
