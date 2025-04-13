import type { TCurrency } from '@root/core/modules/currency/domain/types';
import type {
	TDecimalSeparator,
	TLocaleCode,
} from '@root/core/modules/intl/domain/types';

export interface IIntlService {
	readonly locale: TLocaleCode;
	readonly currency: TCurrency;
	readonly decimalSeparator: TDecimalSeparator;

	formatCurrency(
		value: number,
		options?: {
			currency?: TCurrency;
			hideDecimal?: boolean;
		},
	): string;
	formatDate(value: number | string | Date): string;
	parseNumber(value: string): number;
}
