import { EKey } from '@modules/expenses/newExpense/components/amountInput/enums';
import { IntlService } from '@core/infrastructure/intl/intlService/IntlService';

export const ALLOWED_SYMBOLS = [
	IntlService.getInstance().decimalSeparator,
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
