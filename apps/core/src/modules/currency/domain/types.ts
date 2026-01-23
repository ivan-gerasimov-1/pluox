import type { TValueOf } from '@pluox/core/src/types';

export const ECurrency = {
	EUR: 'EUR',
	GEL: 'GEL',
	RUB: 'RUB',
	USD: 'USD',
	THB: 'THB',
	RSD: 'RSD',
} as const;

export type TCurrency = TValueOf<typeof ECurrency>;

export type TCurrencyRates = Record<TCurrency, number>;
