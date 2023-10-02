import { TISODateString } from '@domain/types';
import { useMemo } from 'react';

export function useMonths(): TISODateString[] {
	const months = useMemo(() => {
		return generateMonths();
	}, []);

	return months;
}

export function generateMonths(): TISODateString[] {
	let year = new Date().getFullYear();

	return new Array(12).fill(null).map((_, index) => {
		return new Date(year, index).toISOString();
	});
}
