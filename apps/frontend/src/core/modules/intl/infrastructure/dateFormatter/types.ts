import type { ELocaleCode } from '@root/core/modules/intl/domain/enums';

export interface IDateFormatter {
	format(value: number | string | Date, locale: ELocaleCode): string;
}

export const enum EDay {
	NUMERIC = 'numeric',
}

export const enum EMonth {
	LONG = 'long',
}

export const enum EYear {
	NUMERIC = 'numeric',
}

export const enum EHour {
	NUMERIC = 'numeric',
}

export const enum EMinute {
	NUMERIC = 'numeric',
}
