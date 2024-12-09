import type { TMonth } from '@domain/amount/useCases/types';

import { dateFn } from '@modules/date/date';
import { EServiceToken } from '@modules/serviceContainer/types';
import { useService } from '@modules/serviceContainer/react/useService';

export function useMonthName(month: TMonth): string {
	let intlService = useService(EServiceToken.INTL_SERVICE);
	let localeCode = intlService.locale;

	let monthName = dateFn({
		month,
	})
		.locale(localeCode)
		.format('MMMM');

	return monthName;
}
