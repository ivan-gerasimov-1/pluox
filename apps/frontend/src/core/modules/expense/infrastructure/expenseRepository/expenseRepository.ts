import type { ICategories } from '@root/core/domain/categories/types';
import type { Id, TISODateString } from '@root/core/domain/types';
import type {
	IExpense,
	TExpenseDTO,
} from '@root/core/modules/expense/domain/expenseEntity/types';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';
import type { IExpenseDataSource } from '@root/core/modules/expense/infrastructure/expenseDataSource/types';

import { ExpenseNotFoundError } from '@root/core/modules/expense/infrastructure/expenseRepository/errors';

export class ExpenseRepository implements IExpenseRepository {
	constructor(
		private readonly categories: ICategories,
		private readonly dataSource: IExpenseDataSource,
	) {}

	public add(expense: IExpense): this {
		let expenseDTO = expense.toObject();

		this.dataSource.setOne(expenseDTO);

		return this;
	}

	public get(): TExpenseDTO[];
	public get(id: Id): TExpenseDTO;
	public get(id?: Id): TExpenseDTO[] | TExpenseDTO {
		if (id !== undefined) {
			return this.getOne(id);
		}

		return this.getAll();
	}

	public list(query?: {
		dateFrom?: TISODateString;
		dateTo?: TISODateString;
	}): TExpenseDTO[] {
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

		this.dataSource //
			.deleteOne(id);

		/**
		 * @todo Move to Application Layer
		 */
		if (expense.category) {
			this.categories.decreaseWeight(expense.category);
		}

		return this;
	}

	private getAll(): TExpenseDTO[] {
		let expenses = this.dataSource.getItems();

		return Object.values(expenses);
	}

	/**
	 * @throws {ExpenseNotFoundError}
	 */
	private getOne(id: Id): TExpenseDTO {
		let expenses = this.dataSource.getItems();
		let expense = Reflect.get(expenses, id);

		if (expense === undefined) {
			throw new ExpenseNotFoundError(id);
		}

		return expense;
	}

	private sortExpensesByISO8601Date(
		expenseA: TExpenseDTO,
		expenseB: TExpenseDTO,
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
