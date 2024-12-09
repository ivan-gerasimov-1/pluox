import { getAllowedSymbols } from '@root/presentation/web-ui/modules/expenses/expenseView/components/amountInput/constants';
import { EServiceToken } from '@modules/serviceContainer/types';
import { resolveService } from '@modules/serviceContainer/resolveService';

export function validateNumber(value: string): boolean {
	if (RegExp('[A-z]+').test(value)) {
		return false;
	}

	let intlService = resolveService(EServiceToken.INTL_SERVICE);
	let decimalSeaparator = intlService.decimalSeparator;

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
		!getAllowedSymbols().includes(
			// @ts-expect-error
			event.key,
		)
	) {
		event.preventDefault();

		return;
	}
}
