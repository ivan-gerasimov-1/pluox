import { ELocaleCode } from '@modules/intl';

enum ECurrency {
	RUSSIAN_RUBLE = 'RUB',
}

enum ECurrencyDisplay {
	NARROW_SYMBOL = 'narrowSymbol',
}

enum ENumberFormatStyle {
	CURRENCY = 'currency',
}

export function formatCurrency(value: number, locale: ELocaleCode): string {
	return Intl.NumberFormat(locale, {
		style: ENumberFormatStyle.CURRENCY,
		currency: ECurrency.RUSSIAN_RUBLE,
		currencyDisplay: ECurrencyDisplay.NARROW_SYMBOL,
	}).format(value);
}
