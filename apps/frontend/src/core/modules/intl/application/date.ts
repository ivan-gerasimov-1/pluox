import { ELocaleCode } from '@root/core/modules/intl/domain/enums';

enum EDay {
	NUMERIC = 'numeric',
}

enum EMonth {
	LONG = 'long',
}

enum EYear {
	NUMERIC = 'numeric',
}

enum EHour {
	NUMERIC = 'numeric',
}

enum EMinute {
	NUMERIC = 'numeric',
}

export function formatDate(
	value: number | string | Date,
	locale: ELocaleCode,
): string {
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
