import type { Id } from '@root/core/domain/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import type { IExpenseFindOptions } from '@root/core/modules/expense/domain/expenseRepository/types';

export interface IExpenseDataSource {
	save(expense: TExpenseDTO): TExpenseDTO;

	findMany(options?: IExpenseFindOptions): {
		items: TExpenseDTO[];
		total: number;
	};
	/** @todo Not Implemented */
	findOne(query: unknown): TExpenseDTO | null;
	findById(id: Id): TExpenseDTO | null;

	remove(id: Id): TExpenseDTO | null;
}
