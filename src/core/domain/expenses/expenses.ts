import { Categories } from '@domain/categories/Categories';
import type { ICategories } from '@domain/categories/types';
import type { IExpense, TExpense } from '@domain/expense/types';
import { ExpenseNotFoundError } from '@domain/expenses/errors';
import type { IExpenses, TExpenses } from '@domain/expenses/types';
import type { Id, TISODateString } from '@domain/types';

export class Expenses implements IExpenses {
	static #instance?: IExpenses;

	readonly #expenses: Map<Id, TExpense>;

	private constructor(private readonly categories: ICategories) {
		this.#expenses = new Map();
	}

	public static getInstance(): IExpenses {
		if (!this.#instance) {
			let categories = Categories.getInstance();

			this.#instance = new Expenses(categories);
		}

		return this.#instance;
	}

	public __addRawExpenses(expenses: TExpenses): IExpenses {
		for (const [id, value] of Object.entries(expenses)) {
			this.#expenses.set(id, value);

			if (value.category) {
				this.categories.increaseWeight(value.category);
			}
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
		let expenseDTO = expense.toObject();

		this.#expenses.set(expense.id, Object.freeze(expenseDTO));

		if (expenseDTO.category) {
			this.categories.increaseWeight(expenseDTO.category);
		}

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
		let expense = this.get(id);

		this.#expenses.delete(expense.id);

		if (expense.category) {
			this.categories.decreaseWeight(expense.category);
		}

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
