import type { IExpense, TExpense } from '@domain/expense/types';
import { ExpenseNotFoundError } from '@domain/expenses/errors';
import type { IExpenses, TExpenses } from '@domain/expenses/types';
import type { Id, TISODateString } from '@domain/types';

export class Expenses implements IExpenses {
	static #instance?: IExpenses;

	readonly #expenses: Map<Id, TExpense>;

	private constructor() {
		this.#expenses = new Map();
	}

	public static getInstance(): IExpenses {
		if (!this.#instance) {
			this.#instance = new Expenses();
		}

		return this.#instance;
	}

	public __addRawExpenses(expenses: TExpenses): IExpenses {
		for (const [id, value] of Object.entries(expenses)) {
			this.#expenses.set(id, value);
		}

		return this;
	}

	private static sortExpensesByISO8601Date(
		expenseA: TExpense,
		expenseB: TExpense,
	): -1 | 0 | 1 {
		const dateA = expenseA.date || expenseA.dateCreated;
		const dateB = expenseB.date || expenseB.dateCreated;

		if (dateA < dateB) {
			return 1;
		}

		if (dateA > dateB) {
			return -1;
		}

		return 0;
	}

	public add(expense: IExpense): this {
		this.#expenses.set(expense.id, Object.freeze(expense.toObject()));

		return this;
	}

	public get(): TExpenses;
	public get(id: Id): TExpense;
	public get(id?: Id): TExpenses | TExpense {
		if (id !== undefined) {
			return this.getOne(id);
		}

		return this.getAll();
	}

	public list(query?: {
		dateFrom?: TISODateString;
		dateTo?: TISODateString;
	}): TExpense[] {
		let expenses = Array.from(this.#expenses.values());

		if (!query) {
			return expenses.reverse();
		}

		return expenses
			.filter((expense) => {
				let meetConditions = true;
				/** @todo remove backwards compatibility */
				let expenseTimestamp = expense.date || expense.dateCreated;

				if (query.dateFrom) {
					meetConditions = expenseTimestamp >= query.dateFrom;

					if (!meetConditions) {
						return false;
					}
				}

				if (query.dateTo) {
					meetConditions = expenseTimestamp <= query.dateTo;
				}

				return meetConditions;
			})
			.sort(Expenses.sortExpensesByISO8601Date);
	}

	public delete(id: Id): this {
		if (!this.#expenses.has(id)) {
			throw new ExpenseNotFoundError(id);
		}

		this.#expenses.delete(id);

		return this;
	}

	private getAll(): TExpenses {
		return Object.fromEntries(this.#expenses.entries());
	}

	/**
	 * @throws {ExpenseNotFoundError}
	 */
	private getOne(id: Id): TExpense {
		const expense = this.#expenses.get(id);

		if (expense === undefined) {
			throw new ExpenseNotFoundError(id);
		}

		return expense;
	}
}
