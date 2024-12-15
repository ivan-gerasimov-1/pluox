import { type TMonth } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/types';

export function monthGuard(value: number): value is TMonth {
	return value >= 0 && value <= 11;
}
