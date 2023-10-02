import { InvalidMonthError } from '@domain/amount/useCases/errors';
import { monthGuard } from '@domain/amount/useCases/typeGuards';
import type { TMonth } from '@domain/amount/useCases/types';

export function getCurrentMonth(): TMonth {
	const currentMonth = new Date().getMonth();

	if (!monthGuard(currentMonth)) {
		throw new InvalidMonthError(currentMonth);
	}

	return currentMonth;
}
