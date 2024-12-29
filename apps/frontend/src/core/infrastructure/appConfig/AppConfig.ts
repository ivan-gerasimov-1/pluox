import { ECurrency } from '@root/core/modules/currency/domain/types';
import { ELocaleCode } from '@core/infrastructure/intl/enums';

import type { TEnvironment } from '@root/config';

export interface IAppConfig {
	locale: ELocaleCode;
	currency: ECurrency;
	availableCurrencies: ECurrency[];
	budget: number | null;

	readonly apiUrl: string;

	readonly openExchangeRates: {
		apiUrl: string;
		apiKey: string;
	};
}

export class AppConfig implements IAppConfig {
	#locale: ELocaleCode;
	#currency: ECurrency;
	#availableCurrencies: ECurrency[];
	#budget: number | null;

	public readonly openExchangeRates: {
		apiUrl: string;
		apiKey: string;
	};

	public readonly apiUrl: string;

	constructor(
		environment: TEnvironment,
		locale: ELocaleCode,
		currency: ECurrency,
	) {
		this.#locale = locale;
		this.#currency = currency;
		this.#availableCurrencies = [
			ECurrency.GEL,
			ECurrency.RUB,
			ECurrency.USD,
			ECurrency.EUR,
			ECurrency.THB,
		];
		this.#budget = 4800;

		this.openExchangeRates = {
			apiUrl: 'https://openexchangerates.org/api',
			apiKey: 'fd33278c63404c26b51d7d37ae50731d',
		};

		this.apiUrl = environment.apiUrl;
	}

	public get locale(): ELocaleCode {
		return this.#locale;
	}

	public set locale(locale: ELocaleCode) {
		this.#locale = locale;
	}

	public get currency(): ECurrency {
		return this.#currency;
	}

	public set currency(value: ECurrency) {
		this.#currency = value;
	}

	public get availableCurrencies(): ECurrency[] {
		return this.#availableCurrencies;
	}

	public set availableCurrencies(value: ECurrency[]) {
		this.#availableCurrencies = value;
	}

	public get budget(): number | null {
		return this.#budget;
	}

	public set budget(value: number | null) {
		this.#budget = value;
	}
}
