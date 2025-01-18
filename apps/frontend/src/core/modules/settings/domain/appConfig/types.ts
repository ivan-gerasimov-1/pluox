import type { ECurrency } from '@root/core/modules/currency/domain/types';
import type { ELocaleCode } from '@root/core/modules/intl/domain/enums';

export type TAppConfig = {
	/** @deprecated In favor of user locale */
	locale: ELocaleCode;
	currency: ECurrency;
	availabelCurrencies: ECurrency[];
	budget: number | null;
};

export interface IAppConfig {
	/** @deprecated In favor of user locale */
	locale: ELocaleCode;
	currency: ECurrency;
	availableCurrencies: ECurrency[];
	budget: number | null;
}
