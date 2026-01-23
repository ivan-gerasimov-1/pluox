import {
	ECurrency,
	type TCurrency,
} from '@pluox/core/src/modules/currency/domain/types';
import type { TLocaleCode } from '@pluox/core/src/modules/intl/domain/types';
import type { IAppConfig } from '@pluox/core/src/modules/settings/domain/appConfig/types';

export class AppConfig implements IAppConfig {
	#locale: TLocaleCode;
	#currency: TCurrency;
	#availableCurrencies: TCurrency[];
	#budget: number | null;

	constructor(locale: TLocaleCode, currency: TCurrency) {
		this.#locale = locale;
		this.#currency = currency;
		this.#availableCurrencies = [
			ECurrency.RSD,
			ECurrency.GEL,
			ECurrency.RUB,
			ECurrency.USD,
			ECurrency.EUR,
			ECurrency.THB,
		];
		this.#budget = 4800;
	}

	public get locale(): TLocaleCode {
		return this.#locale;
	}

	public set locale(locale: TLocaleCode) {
		this.#locale = locale;
	}

	public get currency(): TCurrency {
		return this.#currency;
	}

	public set currency(value: TCurrency) {
		this.#currency = value;
	}

	public get availableCurrencies(): TCurrency[] {
		return this.#availableCurrencies;
	}

	public set availableCurrencies(value: TCurrency[]) {
		this.#availableCurrencies = value;
	}

	public get budget(): number | null {
		return this.#budget;
	}

	public set budget(value: number | null) {
		this.#budget = value;
	}
}
