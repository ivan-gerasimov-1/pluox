import type { TCategory } from '@root/core/domain/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';

export interface IExpenseGroupingService {
	groupByDay(expenses: TExpenseDTO[]): TExpenseGroupByDate[];
	groupByCategory(expenseList: TExpenseDTO[]): TExpenseGroupByCategory[];
}

export type TExpenseGroupByCategory = {
	category: TCategory;
	items: TExpenseDTO[];
};

export type TExpenseGroupByDate = {
	date: string;
	items: TExpenseDTO[];
};
