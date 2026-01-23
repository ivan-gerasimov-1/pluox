import type { TCurrency } from '@pluox/core/src/modules/currency/domain/types';
import type { TLocaleCode } from '@pluox/core/src/modules/intl/domain/types';

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
