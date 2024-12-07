import { EKey } from '@modules/expenses/expenseView/components/amountInput/enums';
import { EServiceToken } from '@modules/serviceContainer/types';
import { resolveService } from '@modules/serviceContainer/resolveService';

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
