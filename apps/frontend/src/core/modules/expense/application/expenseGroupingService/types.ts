import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';

export interface IExpenseGroupingService {
	groupByDay(expenses: TExpenseDTO[]): TExpenseGroupByDate[];
}

export type TExpenseGroupByDate = {
	date: string;
	items: TExpenseDTO[];
};
