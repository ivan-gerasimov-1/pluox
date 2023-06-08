import { type ECurrency } from '@domain/expense/types';
import { ELocaleCode } from '@modules/intl';

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
	locale: ELocaleCode
): string {
	return Intl.NumberFormat(locale, {
		style: ENumberFormatStyle.CURRENCY,
		currency,
		currencyDisplay: ECurrencyDisplay.CODE,
	}).format(value);
}
