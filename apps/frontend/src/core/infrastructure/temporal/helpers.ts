import { InvalidMonthError } from '@root/core/infrastructure/temporal/errors';
import { monthGuard } from '@root/core/infrastructure/temporal/typeGuards';
import type {
	TDateParts,
	TISODateString,
} from '@root/core/domain/temporal/types';

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
