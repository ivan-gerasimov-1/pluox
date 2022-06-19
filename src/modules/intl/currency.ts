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

export function formatCurrency(value: number): string {
	return Intl.NumberFormat(ELocaleCode.RU_RU, {
		style: ENumberFormatStyle.CURRENCY,
		currency: ECurrency.RUSSIAN_RUBLE,
		currencyDisplay: ECurrencyDisplay.NARROW_SYMBOL,
	}).format(value);
}
