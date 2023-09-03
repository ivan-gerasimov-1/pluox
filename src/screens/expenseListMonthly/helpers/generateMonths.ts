import { TISODateString } from '@domain/types';

export function generateMonths(): TISODateString[] {
	let year = new Date().getFullYear();

	return new Array(12).fill(null).map((_, index) => {
		return new Date(year, index, 5).toISOString();
	});
}
