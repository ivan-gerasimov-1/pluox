import type { IExpense, TExpense } from '@domain/expense/types';
import { ExpenseNotFoundError } from '@domain/expenses/errors';
import type { IExpenses, TExpenses } from '@domain/expenses/types';
import type { Id, TISODateString } from '@domain/types';

export class Expenses implements IExpenses {
	readonly #expenses: Map<Id, TExpense>;

	private constructor(expenses: TExpenses) {
		this.#expenses = new Map(Object.entries(expenses));
	}

	public static create(expenses: TExpenses = {}): IExpenses {
		return new Expenses(expenses);
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
				let expenseTimestamp = new Date(
					/** @todo remove backwards compatibility */
					expense.date || expense.dateCreated,
				).getTime();

				if (query.dateFrom) {
					meetConditions =
						expenseTimestamp >= new Date(query.dateFrom).getTime();

					if (!meetConditions) {
						return false;
					}
				}

				if (query.dateTo) {
					meetConditions = expenseTimestamp <= new Date(query.dateTo).getTime();
				}

				return meetConditions;
			})
			.reverse();
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
