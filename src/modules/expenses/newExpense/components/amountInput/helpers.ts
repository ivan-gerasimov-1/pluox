import { ALLOWED_SYMBOLS } from '@modules/expenses/newExpense/components/amountInput/constants';
import { IntlService } from '@core/infrastructure/intl/intlService/IntlService';

export function validateNumber(value: string): boolean {
	if (RegExp('[A-z]+').test(value)) {
		return false;
	}

	let decimalSeaparator = IntlService.getInstance().decimalSeparator;

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
			event.key,
		)
	) {
		event.preventDefault();

		return;
	}
}
