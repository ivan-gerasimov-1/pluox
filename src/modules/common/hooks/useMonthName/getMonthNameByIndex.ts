import type { TMonth } from '@domain/amount/useCases/types';
import {
	type TMonthNameToken,
	EMonthNameToken,
} from '@modules/common/hooks/useMonthName/types';

export function getMonthNameByIndex(month: TMonth): TMonthNameToken {
	let months: Record<number, TMonthNameToken> = {
		0: EMonthNameToken.JANUARY,
		1: EMonthNameToken.FEBRUARY,
		2: EMonthNameToken.MARCH,
		3: EMonthNameToken.APRIL,
		4: EMonthNameToken.MAY,
		5: EMonthNameToken.JUNE,
		6: EMonthNameToken.JULY,
		7: EMonthNameToken.AUGUST,
		8: EMonthNameToken.SEPTEMBER,
		9: EMonthNameToken.OCTOBER,
		10: EMonthNameToken.NOVEMBER,
		11: EMonthNameToken.DECEMBER,
	};

	return months[month];
}
