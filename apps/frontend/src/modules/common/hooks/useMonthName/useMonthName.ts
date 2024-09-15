import type { TMonth } from '@domain/amount/useCases/types';
import { dateFn } from '@modules/date/date';
import { EService, useService } from '@modules/serviceContainer/useService';

export function useMonthName(month: TMonth): string {
	let intlService = useService(EService.INTL);
	let localeCode = intlService.locale;

	let monthName = dateFn({
		month,
	})
		.locale(localeCode)
		.format('MMMM');

	return monthName;
}
