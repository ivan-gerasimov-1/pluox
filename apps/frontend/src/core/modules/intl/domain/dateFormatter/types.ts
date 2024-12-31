import { ELocaleCode } from '@root/core/modules/intl/domain/enums';

export interface IDateFormatter {
	format(value: number | string | Date, locale: ELocaleCode): string;
}
