import type { TCurrency } from '@root/core/modules/currency/domain/types';
import type { TLocaleCode } from '@root/core/modules/intl/domain/types';

export interface ICurrencyFormatter {
	format(
		value: number,
		currency: TCurrency,
		locale: TLocaleCode,
		options?: {
			hideDecimal?: boolean;
		},
	): string;
}
