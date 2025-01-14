import { LocalStorageCollectionDataSource } from '@root/core/infrastructure/dataSource/localStorageCollectionDataSource';

import type {
	TFindManyOptions,
	TFindManyResult,
} from '@root/core/domain/repository/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import type { TExpenseFindOptions } from '@root/core/modules/expense/domain/expenseRepository/types';
import type { IExpenseDataSource } from '@root/core/modules/expense/infrastructure/expenseDataSource/types';

export class ExpenseDataSource
	extends LocalStorageCollectionDataSource<TExpenseDTO, TExpenseFindOptions>
	implements IExpenseDataSource
{
	static readonly #STORAGE_ID: string = 'expenses';

	constructor() {
		super(window.localStorage, {
			id: ExpenseDataSource.#STORAGE_ID,
		});
	}

	public override findMany(
		options?: TFindManyOptions<TExpenseFindOptions>,
	): TFindManyResult<TExpenseDTO> {
		let expensesMap = this.readDataFromStorage();
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
