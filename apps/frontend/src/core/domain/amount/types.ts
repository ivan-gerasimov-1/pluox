import type { TMonth } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/types';

export interface IAmount {
	getTotalByYear(): number;
	getTotalByMonth(month: TMonth): number;
}
