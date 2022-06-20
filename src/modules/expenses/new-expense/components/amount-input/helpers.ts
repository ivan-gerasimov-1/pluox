import { ALLOWED_SYMBOLS } from '@modules/expenses/new-expense/components/amount-input/constants';
import { IntlService } from '@modules/intl';

export function validateNumber(value: string): boolean {
	if (RegExp('[A-z]+').test(value)) {
		return false;
	}

	let decimalSeaparator = IntlService.DECIMAL_SEPARATOR;

	if (value.split(decimalSeaparator).length > 2) {
		return false;
	}

	return true;
}

export function validateKey(event: React.KeyboardEvent<HTMLInputElement>) {
	if (event.metaKey || event.ctrlKey) {
		return;
	}

	if (
		!ALLOWED_SYMBOLS.includes(
			// @ts-expect-error
			event.key
		)
	) {
		event.preventDefault();

		return;
	}
}
