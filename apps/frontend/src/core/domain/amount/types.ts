import type { TMonth } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/types';

/**
 * @deprecated
 */
export interface IAmount {
	getTotalByYear(): number;
	getTotalByMonth(month: TMonth): number;
}
