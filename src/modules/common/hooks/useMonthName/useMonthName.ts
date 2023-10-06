import type { TMonth } from '@domain/amount/useCases/types';
import { getMonthNameByIndex } from '@modules/common/hooks/useMonthName/getMonthNameByIndex';
import { useMonthNameI18n } from '@modules/common/hooks/useMonthName/useMonthName.i18n';
import { useIntl } from '@modules/intl';

export function useMonthName(month: TMonth): string {
	let intl = useIntl(useMonthNameI18n);
	let currentMonth = getMonthNameByIndex(month);

	console.log('useMonthName');

	return intl.translate(currentMonth);
}
