import { type TMonth } from '@domain/amount/useCases/types';

export function monthGuard(value: number): value is TMonth {
	return value >= 0 && value <= 11;
}
