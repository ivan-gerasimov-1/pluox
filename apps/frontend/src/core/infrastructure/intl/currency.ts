import type { ECurrency } from '@root/core/modules/currency/domain/types';
import type { ELocaleCode } from '@core/infrastructure/intl/enums';

enum ECurrencyDisplay {
	NARROW_SYMBOL = 'narrowSymbol',
	CODE = 'code',
}

enum ENumberFormatStyle {
	CURRENCY = 'currency',
}

/**
 * @todo
 * 1. Fix performance issue with Intl.NumberFormat intanciation on every call
 */
export function formatCurrency(
	value: number,
	currency: ECurrency,
	locale: ELocaleCode,
	options?: {
		hideDecimal?: boolean;
	},
): string {
	return Intl.NumberFormat(locale, {
		style: ENumberFormatStyle.CURRENCY,
		currency,
		currencyDisplay: ECurrencyDisplay.NARROW_SYMBOL,
		maximumFractionDigits: options?.hideDecimal ? 0 : 2,
	}).format(value);
}
