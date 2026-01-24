import type { Id } from '@core/domain/types';

import type { TExpenseDTO } from '@core/modules/expense/application/dto/expenseDTO';

export interface IExpenseAmountService {
	calculateAmount(expenses: TExpenseDTO[]): number;
	calculateAmountByCategory(expenses: TExpenseDTO[]): TAmountByCategory[];
}

export type TAmountByCategory = {
	id: Id;
	total: number;
	percentage: number;
};
