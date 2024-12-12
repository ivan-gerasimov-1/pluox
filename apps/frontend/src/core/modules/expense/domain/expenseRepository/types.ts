import type { TExpenses } from '@root/core/domain/expenses/types';
import type { Id, TISODateString } from '@root/core/domain/types';
import type {
	IExpense,
	TExpense,
} from '@root/core/modules/expense/domain/expenseEntity/types';

export interface IExpenseRepository {
	add(expense: IExpense): this;

	get(): TExpenses;
	get(id: Id): TExpense;
	get(id?: Id): TExpenses | TExpense;

	list(query?: {
		dateFrom?: TISODateString;
		dateTo?: TISODateString;
	}): TExpense[];

	delete(id: Id): IExpenseRepository;
}
