import { type TMonth } from '@domain/expenses/use-cases/types';

export function monthGuard(value: number): value is TMonth {
	return value >= 0 && value <= 11;
}
