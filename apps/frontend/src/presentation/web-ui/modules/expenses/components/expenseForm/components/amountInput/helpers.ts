import { resolveService } from '@/core/infrastructure/serviceContainer/resolveService';
import { getAllowedSymbols } from '@/presentation/web-ui/modules/expenses/components/expenseForm/components/amountInput/constants';
import { EServiceToken } from '@/presentation/web-ui/modules/serviceContainer/enums';

export function validateNumber(value: string): boolean {
	let numberRegExp = /[A-z]+/u;
	if (numberRegExp.test(value)) {
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
			// @ts-expect-error | typeguard
			event.key,
		)
	) {
		event.preventDefault();
	}
}
