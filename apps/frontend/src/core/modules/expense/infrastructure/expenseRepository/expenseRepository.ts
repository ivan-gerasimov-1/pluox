import { ExpenseNotFoundError } from '@root/core/domain/expenses/errors';

import type { TMonth } from '@root/core/domain/amount/useCases/types';
import type { ICategories } from '@root/core/domain/categories/types';
import type { TExpenses } from '@root/core/domain/expenses/types';
import type { Id, TISODateString } from '@root/core/domain/types';
import type { IAppConfig } from '@root/core/infrastructure/appConfig/AppConfig';
import type { ICurrencyConverter } from '@root/core/infrastructure/currency/currencyConverter/types';
import type {
	IExpense,
	TExpense,
} from '@root/core/modules/expense/domain/expenseEntity/types';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';

export class ExpenseRepository implements IExpenseRepository {
	/**
	 * @deprecated Use DataSource
	 */
	readonly #expenses: Map<Id, TExpense>;

	constructor(
		private readonly appConfig: IAppConfig,
		private readonly categories: ICategories,
		private readonly currencyConverter: ICurrencyConverter,
		/**
		 * 	@todo
		 */
		// private readonly dataSource: IExpenseDataSource,
	) {
		this.#expenses = new Map();
	}

	/**
	 * @deprecated Use DataSource
	 */
	public __addRawExpenses(expenses: TExpenses): IExpenseRepository {
		for (const [id, value] of Object.entries(expenses)) {
			this.#expenses.set(id, value);

			if (value.category) {
				this.categories.increaseWeight(value.category);
			}
		}

		return this;
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
			.sort(this.sortExpensesByISO8601Date);
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

			expensesByCategory[category].total += this.currencyConverter.convert(
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

	private sortExpensesByISO8601Date(
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
}
