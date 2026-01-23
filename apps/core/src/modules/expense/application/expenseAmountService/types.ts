import type { Id } from '@pluox/core/src/domain/types';

import type { TExpenseDTO } from '@pluox/core/src/modules/expense/application/dto/expenseDTO';

export interface IExpenseAmountService {
	calculateAmount(expenses: TExpenseDTO[]): number;
	calculateAmountByCategory(expenses: TExpenseDTO[]): TAmountByCategory[];
}

export type TAmountByCategory = {
	id: Id;
	total: number;
	percentage: number;
};
