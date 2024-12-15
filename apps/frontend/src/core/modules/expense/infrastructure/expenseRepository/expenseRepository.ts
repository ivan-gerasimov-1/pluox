import type { Id } from '@root/core/domain/types';
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

		this.dataSource.save(expenseDTO);

		return expenseDTO;
	}

	public update(expense: IExpense): TExpenseDTO {
		let expenseDTO = expense.toObject();

		this.dataSource.save(expenseDTO);

		return expenseDTO;
	}

	public findMany(options?: IExpenseFindManyOptions): IExpenseFindManyResult {
		let expenses = this.dataSource.findMany(options);

		return expenses;
	}

	public findOne(query: unknown): TExpenseDTO {
		throw new Error('Not implemented');
	}

	/**
	 * @throws {ExpenseNotFoundError}
	 */
	public findById(id: Id): TExpenseDTO {
		let expense = this.dataSource.findById(id);

		if (expense === null) {
			throw new ExpenseNotFoundError(id);
		}

		return expense;
	}

	/**
	 * @throws {ExpenseNotFoundError}
	 */
	public remove(id: Id): void {
		let deletedExpenseId = this.dataSource.remove(id);

		if (deletedExpenseId === null) {
			throw new ExpenseNotFoundError(id);
		}
	}
}
