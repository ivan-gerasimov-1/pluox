import type { TCategory } from '@pluox/core/src/domain/types';

import type { TExpenseDTO } from '@pluox/core/src/modules/expense/application/dto/expenseDTO';

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
