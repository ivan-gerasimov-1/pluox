import type { TDateParts, TISODateString } from '@core/domain/temporal/types';
import { InvalidMonthError } from '@core/infrastructure/temporal/errors';
import { monthGuard } from '@core/infrastructure/temporal/typeGuards';

/**
 * @throws InvalidMonthError
 */
export function getDateParts(dateString: TISODateString): TDateParts {
	const date = new Date(dateString);
	const month = date.getMonth();
	const year = date.getFullYear();

	if (!monthGuard(month)) {
		throw new InvalidMonthError(month);
	}

	return {
		month,
		year,
	};
}
