import { type ECurrency } from '@core/infrastructure/currency/types';
import { type ELocaleCode } from '@core/infrastructure/intl/enums';

enum ECurrencyDisplay {
	NARROW_SYMBOL = 'narrowSymbol',
	CODE = 'code',
}

enum ENumberFormatStyle {
	CURRENCY = 'currency',
}

export function formatCurrency(
	value: number,
	currency: ECurrency,
	locale: ELocaleCode,
): string {
	return Intl.NumberFormat(locale, {
		style: ENumberFormatStyle.CURRENCY,
		currency,
		currencyDisplay: ECurrencyDisplay.NARROW_SYMBOL,
	}).format(value);
}
