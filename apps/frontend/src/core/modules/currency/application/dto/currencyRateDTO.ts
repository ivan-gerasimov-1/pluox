import type { TCurrency } from '@root/core/modules/currency/domain/types';

export type TCurrencyRateDTO = {
	code: TCurrency;
	rate: number;
};
