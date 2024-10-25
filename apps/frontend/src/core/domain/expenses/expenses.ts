import {
	AppConfig,
	type IAppConfig,
} from '@core/infrastructure/appConfig/AppConfig';
import { CurrencyConverter } from '@core/infrastructure/currency/currencyConverter/currencyConverter';
import type { TMonth } from '@domain/amount/useCases/types';
import { Categories } from '@domain/categories/Categories';
import type { ICategories } from '@domain/categories/types';
import type { IExpense, TExpense } from '@domain/expense/types';
import { ExpenseNotFoundError } from '@domain/expenses/errors';
import type { IExpenses, TExpenses } from '@domain/expenses/types';
import type { Id, TISODateString } from '@domain/types';

export class Expenses implements IExpenses {
	static #instance?: IExpenses;

	readonly #expenses: Map<Id, TExpense>;

	private constructor(
		private readonly appConfig: IAppConfig,
		private readonly categories: ICategories,
	) {
		this.#expenses = new Map();
	}

	public static getInstance(): IExpenses {
		if (!this.#instance) {
			let appConfig = AppConfig.getInstance();
			let categories = Categories.getInstance();

			this.#instance = new Expenses(appConfig, categories);
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
		const dateA = expenseA.date;
		const dateB = expenseB.date;

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
				let expenseTimestamp = expense.date;

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

	public getMonthlyExpensesByCategory(month: TMonth): {
		id: Id;
		total: number;
		percentage: number;
	}[] {
		let currencyConverter = CurrencyConverter.getInstance();
		let currency = this.appConfig.currency;

		let total = 0;

		let expensesByCategory: Record<
			Id,
			{
				id: Id;
				total: number;
				percentage: number;
			}
		> = {};

		const startDate = new Date(new Date(new Date().getFullYear(), month, 1));
		const endDate = new Date(new Date(new Date().getFullYear(), month, 30));

		let expenses = this.list({
			dateFrom: startDate.toISOString(),
			dateTo: endDate.toISOString(),
		});

		for (let expense of expenses) {
			let category = expense.category || '—';

			if (!expensesByCategory[category]) {
				expensesByCategory[category] = {
					id: category,
					total: 0,
					percentage: 0,
				};
			}

			expensesByCategory[category].total += currencyConverter.convert(
				expense.amount,
				expense.currency,
				currency,
			);
		}

		for (let category in expensesByCategory) {
			total += expensesByCategory[category].total;
		}

		for (let category in expensesByCategory) {
			expensesByCategory[category].percentage =
				(expensesByCategory[category].total / total) * 100;
		}

		let result = Object.values(expensesByCategory);

		return result.sort((a, b) => b.total - a.total);
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
