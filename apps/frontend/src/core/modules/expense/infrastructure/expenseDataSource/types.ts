import type { Id } from '@root/core/domain/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import type {
	IExpenseFindManyOptions,
	IExpenseFindManyResult,
} from '@root/core/modules/expense/domain/expenseRepository/types';

export interface IExpenseDataSource {
	save(expense: TExpenseDTO): TExpenseDTO;

	findMany(options?: IExpenseFindManyOptions): IExpenseFindManyResult;
	/** @todo Not Implemented */
	findOne(query: unknown): TExpenseDTO | null;
	findById(id: Id): TExpenseDTO | null;

	remove(id: Id): Id | null;
}
