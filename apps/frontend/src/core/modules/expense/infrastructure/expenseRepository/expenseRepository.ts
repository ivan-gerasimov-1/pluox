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
import type { IExpenseDataSource } from '@root/core/modules/expense/infrastructure/expenseDataSource/types';

import { ExpenseNotFoundError } from '@root/core/modules/expense/infrastructure/expenseRepository/errors';

export class ExpenseRepository implements IExpenseRepository {
	constructor(
		private readonly appConfig: IAppConfig,
		private readonly categories: ICategories,
		private readonly currencyConverter: ICurrencyConverter,
		private readonly dataSource: IExpenseDataSource,
	) {}

	public add(expense: IExpense): this {
		let expenseDTO = expense.toObject();

		this.dataSource //
			.setOne(expenseDTO);

		/**
		 * @todo Move to Application Layer
		 */
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
		let expensesMap = this.dataSource.getItems();
		let expenses = Object.values(expensesMap);

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
		let expenses = this.dataSource.getItems();

		Reflect.deleteProperty(expenses, id);

		/**
		 * @todo Move to Application Layer
		 */
		if (expense.category) {
			this.categories.decreaseWeight(expense.category);
		}

		this.dataSource //
			.setItems(expenses);

		return this;
	}

	/**
	 * @todo Move to UseCase
	 */
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
		let expenses = this.dataSource.getItems();

		return expenses;
	}

	/**
	 * @throws {ExpenseNotFoundError}
	 */
	private getOne(id: Id): TExpense {
		let expenses = this.dataSource.getItems();
		let expense = Reflect.get(expenses, id);

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
