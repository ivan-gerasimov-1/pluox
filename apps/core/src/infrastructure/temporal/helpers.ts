import type { TDateParts, TISODateString } from '@pluox/core/src/domain/temporal/types';

import { InvalidMonthError } from '@pluox/core/src/infrastructure/temporal/errors';
import { monthGuard } from '@pluox/core/src/infrastructure/temporal/typeGuards';

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
