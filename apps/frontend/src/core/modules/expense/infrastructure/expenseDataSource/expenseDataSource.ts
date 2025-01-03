import { LocalStorageDataSource } from '@root/core/infrastructure/dataSource/dataSource';

import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import type { Id } from '@domain/types';
import type { IExpenseDataSource } from '@root/core/modules/expense/infrastructure/expenseDataSource/types';
import type { IExpenseFindOptions } from '@root/core/modules/expense/domain/expenseRepository/types';

export class ExpenseDataSource
	extends LocalStorageDataSource<{
		state?: {
			operations: Record<Id, TExpenseDTO>;
		};
	}>
	implements IExpenseDataSource
{
	static readonly #STORAGE_ID: string = 'store/$expenses';

	constructor() {
		super(ExpenseDataSource.#STORAGE_ID);
	}

	public save(expense: TExpenseDTO): TExpenseDTO {
		let expenses = this.getItems();

		Reflect.set(expenses, expense.id, expense);

		this.setItems(expenses);

		return expense;
	}

	public findMany(options?: IExpenseFindOptions): {
		items: TExpenseDTO[];
		total: number;
	} {
		let expensesMap = this.getItems();
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

	findOne(query: unknown): TExpenseDTO {
		throw new Error('Method not implemented.');
	}

	findById(id: Id): TExpenseDTO | null {
		let expenses = this.getItems();
		let expense = Reflect.get(expenses, id);

		if (expense === undefined) {
			return null;
		}

		return expense;
	}

	public remove(id: Id): TExpenseDTO | null {
		let expenses = this.getItems();
		let expense = Reflect.get(expenses, id);

		if (expense === undefined) {
			return null;
		}

		Reflect.deleteProperty(expenses, id);

		this.setItems(expenses);

		return expense;
	}

	private getItems(): Record<Id, TExpenseDTO> {
		const value = this.read();

		if (!value?.state) {
			return {};
		}

		return value.state.operations;
	}

	/**
	 * @todo
	 * 1. Simplify structure
	 * 2. Return to update
	 */
	private setItems(values: Record<Id, TExpenseDTO>): IExpenseDataSource {
		this.clear();

		this.create({
			state: {
				operations: values,
			},
			// version: 0,
		});

		// this.update({
		// 	state: {
		// 		operations: values,
		// 	},
		// });

		return this;
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
