import { ELocaleCode } from '@root/core/modules/intl/domain/enums';
import {
	type IDateFormatter,
	EDay,
	EMonth,
	EYear,
} from '@root/core/modules/intl/infrastructure/dateFormatter/types';

export class DateFormatter implements IDateFormatter {
	format(value: number | string | Date, locale: ELocaleCode): string {
		let date = value;

		if (typeof date === 'string') {
			date = new Date(date);
		}

		return Intl.DateTimeFormat(locale, {
			day: EDay.NUMERIC,
			month: EMonth.LONG,
			year: EYear.NUMERIC,
		}).format(date);
	}
}
