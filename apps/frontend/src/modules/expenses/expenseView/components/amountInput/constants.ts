import { getGlobalContainer } from '@root/diContainer';

import { EKey } from '@modules/expenses/expenseView/components/amountInput/enums';
import { EServiceToken } from '@modules/serviceContainer/types';

export const getAllowedSymbols = () => {
	let intlService = getGlobalContainer().get(EServiceToken.INTL_SERVICE);

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
