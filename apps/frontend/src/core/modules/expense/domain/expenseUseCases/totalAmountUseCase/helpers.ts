import { InvalidMonthError } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/errors';
import { monthGuard } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/typeGuards';
import type { TDateParts } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/types';
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
