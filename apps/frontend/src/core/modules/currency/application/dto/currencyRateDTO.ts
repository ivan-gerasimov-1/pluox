import type { ECurrency } from '@root/core/modules/currency/domain/types';

export type TCurrencyRateDTO = {
	code: ECurrency;
	rate: number;
};
