import type { ECurrency } from '@root/core/modules/currency/domain/types';
import type { ELocaleCode } from '@root/core/modules/intl/enums';
import type { TDecimalSeparator } from '@root/core/modules/intl/types';

export interface IIntlService {
	readonly locale: ELocaleCode;
	readonly currency: ECurrency;
	readonly decimalSeparator: TDecimalSeparator;

	formatCurrency(
		value: number,
		options?: {
			currency?: ECurrency;
			hideDecimal?: boolean;
		},
	): string;
	formatDate(value: number | string | Date): string;
	parseNumber(value: string): number;
}
