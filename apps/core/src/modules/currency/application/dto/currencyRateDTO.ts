import type { TCurrency } from '@pluox/core/src/modules/currency/domain/types';

export type TCurrencyRateDTO = {
	code: TCurrency;
	rate: number;
};
