import type { Id, TISODateString } from '@root/core/domain/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import type { IExpense } from '@root/core/modules/expense/domain/expenseEntity/types';
import type {
	IExpenseFindManyOptions,
	IExpenseFindManyResult,
	IExpenseRepository,
} from '@root/core/modules/expense/domain/expenseRepository/types';
import type { IExpenseDataSource } from '@root/core/modules/expense/infrastructure/expenseDataSource/types';

import { ExpenseNotFoundError } from '@root/core/modules/expense/infrastructure/expenseRepository/errors';

export class ExpenseRepository implements IExpenseRepository {
	constructor(private readonly dataSource: IExpenseDataSource) {}

	public create(expense: IExpense): TExpenseDTO {
		let expenseDTO = expense.toObject();

		this.dataSource.setOne(expenseDTO);

		return expenseDTO;
	}

	public update(expense: IExpense): TExpenseDTO {
		let expenseDTO = expense.toObject();

		this.dataSource.setOne(expenseDTO);

		return expenseDTO;
	}

	/**
	 * @todo Move filter and other logic to DataSource
	 */
	public findMany(options?: IExpenseFindManyOptions): IExpenseFindManyResult {
		let expensesMap = this.dataSource.getItems();
		let expenses = Object.values(expensesMap);

		if (!options) {
			return {
				items: expenses.reverse(),
				total: expenses.length,
			};
		}

		let filteredExpenses = expenses
			.filter((expense) => {
				let meetConditions = true;
				let expenseTimestamp = expense.date;

				if (options?.filter?.dateFrom) {
					meetConditions = expenseTimestamp >= options.filter.dateFrom;

					if (!meetConditions) {
						return false;
					}
				}

				if (options?.filter?.dateTo) {
					meetConditions = expenseTimestamp <= options.filter.dateTo;
				}

				return meetConditions;
			})
			.sort(this.sortExpensesByISO8601Date);

		return {
			items: filteredExpenses,
			total: filteredExpenses.length,
		};
	}

	public findOne(query: unknown): TExpenseDTO {
		throw new Error('Not implemented');
	}

	/**
	 * @throws {ExpenseNotFoundError}
	 */
	public findById(id: Id): TExpenseDTO {
		let expenses = this.dataSource.getItems();
		let expense = Reflect.get(expenses, id);

		if (expense === undefined) {
			throw new ExpenseNotFoundError(id);
		}

		return expense;
	}

	public remove(id: Id): void {
		this.dataSource.deleteOne(id);
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
