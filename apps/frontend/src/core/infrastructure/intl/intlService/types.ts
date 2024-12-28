import type { ECurrency } from '@root/core/modules/currency/domain/types';
import type { ELocaleCode } from '@core/infrastructure/intl/enums';
import type { TDecimalSeparator } from '@core/infrastructure/intl/types';

export interface IIntlService {
	readonly locale: ELocaleCode;
	readonly currency: ECurrency;
	readonly decimalSeparator: TDecimalSeparator;

	formatCurrency(
		value: number,
		options?: {
			currency?: ECurrency;
		},
	): string;
	formatDate(value: number | string | Date): string;
	parseNumber(value: string): number;
}
