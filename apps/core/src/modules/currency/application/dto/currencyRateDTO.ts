import type { TCurrency } from '@core/modules/currency/domain/types';

export type TCurrencyRateDTO = {
	code: TCurrency;
	rate: number;
};
