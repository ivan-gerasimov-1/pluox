import type { ECurrency } from '@root/core/modules/currency/types';
import type { ELocaleCode } from '@core/infrastructure/intl/enums';

export type TAppConfig = {
	locale: ELocaleCode;
	currency: ECurrency;
	availabelCurrencies: ECurrency[];
	budget: number | null;
};
