import type { TLocaleCode } from '@core/modules/intl/domain/types';

export interface IDateFormatter {
	format(value: number | string | Date, locale: TLocaleCode): string;
}
