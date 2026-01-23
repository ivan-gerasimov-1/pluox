import { resolveService } from '@/core/infrastructure/serviceContainer/resolveService';

import { EKey } from '@/presentation/web/modules/expenses/components/expenseForm/components/amountInput/enums';
import { EServiceToken } from '@/presentation/web/modules/serviceContainer/enums';

/** @todo Find out if possible to use "function getAllowedSymbols(…) { … }" */
// eslint-disable-next-line func-style
export const getAllowedSymbols = () => {
	let intlService = resolveService(EServiceToken.INTL_SERVICE);

	return [
		intlService.decimalSeparator,
		EKey.Digit0,
		EKey.Digit1,
		EKey.Digit2,
		EKey.Digit3,
		EKey.Digit4,
		EKey.Digit5,
		EKey.Digit6,
		EKey.Digit7,
		EKey.Digit8,
		EKey.Digit9,
		EKey.ArrowUp,
		EKey.ArrowDown,
		EKey.ArrowLeft,
		EKey.ArrowRight,
		EKey.Backspace,
		EKey.Enter,
		EKey.Tab,
	];
};
