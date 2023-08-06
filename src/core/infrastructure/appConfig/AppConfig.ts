import { ECurrency } from '@core/infrastructure/currency/types';
import { ELocaleCode } from '@core/infrastructure/intl/enums';

export interface IAppConfig {
	readonly locale: ELocaleCode;
	readonly currency: ECurrency;
	readonly availabelCurrencies: ECurrency[];

	readonly openExchangeRates: {
		apiUrl: string;
		apiKey: string;
	};
}

export class AppConfig implements IAppConfig {
	static #instance?: IAppConfig;

	#locale: ELocaleCode;
	#currency: ECurrency;
	#availableCurrencies: ECurrency[];

	#openExchangeRates: {
		apiUrl: string;
		apiKey: string;
	};

	private constructor(locale: ELocaleCode, currency: ECurrency) {
		this.#locale = locale;
		this.#currency = currency;
		this.#availableCurrencies = [ECurrency.GEL, ECurrency.RUB, ECurrency.USD];

		this.#openExchangeRates = {
			apiUrl: 'https://openexchangerates.org/api',
			apiKey: 'fd33278c63404c26b51d7d37ae50731d',
		};
	}

	public get locale(): ELocaleCode {
		return this.#locale;
	}

	public get currency(): ECurrency {
		return this.#currency;
	}

	public get availabelCurrencies(): ECurrency[] {
		return this.#availableCurrencies;
	}

	public get openExchangeRates(): {
		apiUrl: string;
		apiKey: string;
	} {
		return this.#openExchangeRates;
	}

	public static getInstance(): IAppConfig {
		if (!this.#instance) {
			this.#instance = new AppConfig(ELocaleCode.RU_RU, ECurrency.USD);
		}

		return this.#instance;
	}
}
