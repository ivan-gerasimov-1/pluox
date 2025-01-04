import { InvalidMonthError } from '@root/core/infrastructure/temporal/errors';
import { monthGuard } from '@root/core/infrastructure/temporal/typeGuards';
import type {
	TDateParts,
	TISODateString,
} from '@root/core/domain/temporal/types';

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
