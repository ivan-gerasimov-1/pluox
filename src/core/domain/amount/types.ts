import type { TISODateString } from '@domain/types';

export interface IAmount {
	getTotal(): number;
	getMonthly(currentDate: TISODateString): number;
}
