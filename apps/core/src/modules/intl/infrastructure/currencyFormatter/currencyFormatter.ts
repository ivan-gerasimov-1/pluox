import type { TCurrency } from '@core/modules/currency/domain/types';
import type { ICurrencyFormatter } from '@core/modules/intl/domain/currencyFormatter/types';
import type { TLocaleCode } from '@core/modules/intl/domain/types';
import {
	ECurrencyDisplay,
	ENumberFormatStyle,
} from '@core/modules/intl/infrastructure/currencyFormatter/types';

/**
 * @todo
 * 1. Fix performance issue with Intl.NumberFormat intanciation on every call
 */
export class CurrencyFormatter implements ICurrencyFormatter {
	public format(
		value: number,
		currency: TCurrency,
		locale: TLocaleCode,
		options?: {
			hideDecimal?: boolean;
		},
	): string {
		let formatter = this.createFormatter(currency, locale, {
			hideDecimal: options?.hideDecimal,
		});

		return formatter.format(value);
	}

	/** @todo #1 */
	private createFormatter(
		currency: TCurrency,
		locale: TLocaleCode,
		options?: {
			hideDecimal?: boolean;
		},
	): Intl.NumberFormat {
		return new Intl.NumberFormat(locale, {
			style: ENumberFormatStyle.CURRENCY,
			currency,
			currencyDisplay: ECurrencyDisplay.NARROW_SYMBOL,
			maximumFractionDigits: options?.hideDecimal ? 0 : 2,
		});
	}
}
