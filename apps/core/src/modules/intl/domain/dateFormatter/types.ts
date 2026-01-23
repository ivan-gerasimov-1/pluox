import type { TLocaleCode } from '@pluox/core/src/modules/intl/domain/types';

export interface IDateFormatter {
	format(value: number | string | Date, locale: TLocaleCode): string;
}
