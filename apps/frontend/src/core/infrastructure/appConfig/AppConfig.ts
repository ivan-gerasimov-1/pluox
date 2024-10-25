import { ECurrency } from '@core/infrastructure/currency/types';
import { ELocaleCode } from '@core/infrastructure/intl/enums';
import { InvalidMonthError } from '@domain/amount/useCases/errors';
import { monthGuard } from '@domain/amount/useCases/typeGuards';
import type { TMonth } from '@domain/amount/useCases/types';
import { environment } from '@root/config';

export interface IAppConfig {
	locale: ELocaleCode;
	currency: ECurrency;
	availabelCurrencies: ECurrency[];
	budget: number | null;
	readonly currentMonth: TMonth;
	readonly apiUrl: string;

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
	#budget: number | null;

	#currentMonth: TMonth;

	#openExchangeRates: {
		apiUrl: string;
		apiKey: string;
	};

	#apiUrl: string;

	private constructor(
		locale: ELocaleCode,
		currency: ECurrency,
		apiUrl: string,
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
		this.#currentMonth = this.getCurrentMonth();

		this.#openExchangeRates = {
			apiUrl: 'https://openexchangerates.org/api',
			apiKey: 'fd33278c63404c26b51d7d37ae50731d',
		};

		this.#apiUrl = apiUrl;
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

	public get availabelCurrencies(): ECurrency[] {
		return this.#availableCurrencies;
	}

	public set availabelCurrencies(value: ECurrency[]) {
		this.#availableCurrencies = value;
	}

	public get budget(): number | null {
		return this.#budget;
	}

	public set budget(value: number | null) {
		this.#budget = value;
	}

	public get currentMonth(): TMonth {
		return this.#currentMonth;
	}

	public get openExchangeRates(): {
		apiUrl: string;
		apiKey: string;
	} {
		return this.#openExchangeRates;
	}

	public get apiUrl(): string {
		return this.#apiUrl;
	}

	public static getInstance(): IAppConfig {
		if (!this.#instance) {
			const apiUrl = environment.apiUrl;

			this.#instance = new AppConfig(ELocaleCode.RU_RU, ECurrency.USD, apiUrl);
		}

		return this.#instance;
	}

	private getCurrentMonth(): TMonth {
		const month = new Date().getMonth();

		if (!monthGuard(month)) {
			throw new InvalidMonthError(month);
		}

		return month;
	}
}
