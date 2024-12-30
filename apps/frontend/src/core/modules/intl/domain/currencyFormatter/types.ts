import type { ECurrency } from '@root/core/modules/currency/domain/types';
import type { ELocaleCode } from '@root/core/modules/intl/domain/enums';

export interface ICurrencyFormatter {
	format(
		value: number,
		currency: ECurrency,
		locale: ELocaleCode,
		options?: {
			hideDecimal?: boolean;
		},
	): string;
}
