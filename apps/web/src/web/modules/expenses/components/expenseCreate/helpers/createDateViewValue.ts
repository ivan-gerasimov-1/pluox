import type { TISODateString } from '@core/domain/temporal/types';

export function createDateViewValue(
	initialDate?: string | null,
): TISODateString {
	// oxlint-disable typescript/strict-boolean-expressions
	const date = initialDate ? new Date(initialDate) : new Date();

	function format(value: number): string {
		if (value < 10) {
			return `0${value}`;
		}

		return `${value}`;
	}

	return `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(
		date.getDate(),
	)}T${format(date.getHours())}:${format(date.getMinutes())}`;
}
