import type { ECurrency } from '@root/core/modules/currency/domain/types';
import type { ICurrencyFormatter } from '@root/core/modules/intl/domain/currencyFormatter/types';
import type { ELocaleCode } from '@root/core/modules/intl/domain/enums';
import {
	ECurrencyDisplay,
	ENumberFormatStyle,
} from '@root/core/modules/intl/infrastructure/numberParser/currencyFormatter/types';

/**
 * @todo
 * 1. Fix performance issue with Intl.NumberFormat intanciation on every call
 */
export class CurrencyFormatter implements ICurrencyFormatter {
	public format(
		value: number,
		currency: ECurrency,
		locale: ELocaleCode,
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
		currency: ECurrency,
		locale: ELocaleCode,
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
