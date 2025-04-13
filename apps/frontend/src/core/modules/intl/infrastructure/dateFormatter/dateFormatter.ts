import type { IDateFormatter } from '@root/core/modules/intl/domain/dateFormatter/types';
import type { TLocaleCode } from '@root/core/modules/intl/domain/types';

import {
	EDay,
	EMonth,
	EYear,
} from '@root/core/modules/intl/infrastructure/dateFormatter/types';

export class DateFormatter implements IDateFormatter {
	format(value: number | string | Date, locale: TLocaleCode): string {
		let date = value;

		if (typeof date === 'string') {
			date = new Date(date);
		}

		return new Intl.DateTimeFormat(locale, {
			day: EDay.NUMERIC,
			month: EMonth.LONG,
			year: EYear.NUMERIC,
		}).format(date);
	}
}
