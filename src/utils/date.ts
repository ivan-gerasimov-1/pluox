import { ELocaleCode } from '@modules/intl';

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

export function formatDate(value: number | string | Date): string {
	let date = value;

	if (typeof date === 'string') {
		date = new Date(date);
	}

	return Intl.DateTimeFormat(ELocaleCode.RU_RU, {
		day: EDay.NUMERIC,
		month: EMonth.LONG,
		year: EYear.NUMERIC,

		hour: EHour.NUMERIC,
		minute: EMinute.NUMERIC,
	}).format(date);
}
