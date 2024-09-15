import { InvalidMonthError } from '@domain/amount/useCases/errors';
import { monthGuard } from '@domain/amount/useCases/typeGuards';
import type { TDateParts } from '@domain/amount/useCases/types';
import type { TISODateString } from '@domain/types';

/**
 * @throws InvalidMonthError
 */
export function getDateParts(date: TISODateString): TDateParts {
	const _date = new Date(date);
	const month = _date.getMonth();
	const year = _date.getFullYear();

	if (!monthGuard(month)) {
		throw new InvalidMonthError(month);
	}

	return {
		month,
		year,
	};
}
