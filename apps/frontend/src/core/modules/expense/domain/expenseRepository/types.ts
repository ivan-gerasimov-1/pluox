import type { Id, TISODateString } from '@root/core/domain/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import type { IExpense } from '@root/core/modules/expense/domain/expenseEntity/types';

export interface IExpenseRepository {
	add(expense: IExpense): this;

	get(): TExpenseDTO[];
	get(id: Id): TExpenseDTO;
	get(id?: Id): TExpenseDTO[] | TExpenseDTO;

	list(query?: {
		dateFrom?: TISODateString;
		dateTo?: TISODateString;
	}): TExpenseDTO[];

	delete(id: Id): IExpenseRepository;
}
