import { ECurrency } from '@core/infrastructure/currency/types';
import { ELocaleCode } from '@core/infrastructure/intl/enums';

export type TAppConfig = {
	locale: ELocaleCode;
	currency: ECurrency;
	availabelCurrencies: ECurrency[];
	budget: number | null;
};
