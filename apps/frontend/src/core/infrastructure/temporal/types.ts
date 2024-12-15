import type { TMonth } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/types';
import type { TISODateString } from '@root/core/domain/types';

export interface ITemporal {
	getMonth(month?: TMonth): string;
	getStartOfMonth(month?: TMonth): TISODateString;
	getEndOfMonth(month?: TMonth): TISODateString;
	getTimezone(): string;
	getMonthList(): TMonth[];
	getISODateString(): TISODateString;
}
