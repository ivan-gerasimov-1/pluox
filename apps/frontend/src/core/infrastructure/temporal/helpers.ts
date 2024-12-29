import { InvalidMonthError } from '@root/core/infrastructure/temporal/errors';
import { monthGuard } from '@root/core/infrastructure/temporal/typeGuards';
import type {
	TDateParts,
	TISODateString,
	TMonth,
} from '@root/core/infrastructure/temporal/types';

/**
 * @deprecated
 * @throws InvalidMonthError
 */
export function getCurrentMonth(): TMonth {
	const month = new Date().getMonth();

	if (!monthGuard(month)) {
		throw new InvalidMonthError(month);
	}

	return month;
}

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
