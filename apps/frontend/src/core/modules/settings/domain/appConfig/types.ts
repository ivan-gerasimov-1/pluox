import type { TCurrency } from '@root/core/modules/currency/domain/types';
import type { TLocaleCode } from '@root/core/modules/intl/domain/types';

export type TAppConfig = {
	/** @deprecated In favor of user locale */
	locale: TLocaleCode;
	currency: TCurrency;
	availabelCurrencies: TCurrency[];
	budget: number | null;
};

export interface IAppConfig {
	/** @deprecated In favor of user locale */
	locale: TLocaleCode;
	currency: TCurrency;
	availableCurrencies: TCurrency[];
	budget: number | null;
}
