import type { TMonth } from '@root/core/infrastructure/temporal/types';

export function monthGuard(value: number): value is TMonth {
	return value >= 0 && value <= 11;
}
