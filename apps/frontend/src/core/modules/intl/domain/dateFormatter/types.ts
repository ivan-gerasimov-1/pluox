import type { TLocaleCode } from '@root/core/modules/intl/domain/types';

export interface IDateFormatter {
	format(value: number | string | Date, locale: TLocaleCode): string;
}
