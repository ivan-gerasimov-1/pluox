import { ECurrency } from '@core/infrastructure/currency/types';
import { ELocaleCode } from '@core/infrastructure/intl/enums';
import { InvalidMonthError } from '@domain/amount/useCases/errors';
import { monthGuard } from '@domain/amount/useCases/typeGuards';
import type { TMonth } from '@domain/amount/useCases/types';

export interface IAppConfig {
	readonly locale: ELocaleCode;
	readonly currency: ECurrency;
	readonly availabelCurrencies: ECurrency[];
	readonly budget: number | null;
	readonly currentMonth: TMonth;

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

	private constructor(locale: ELocaleCode, currency: ECurrency) {
		this.#locale = locale;
		this.#currency = currency;
		this.#availableCurrencies = [ECurrency.GEL, ECurrency.RUB, ECurrency.USD];
		this.#budget = 4800;
		this.#currentMonth = this.getCurrentMonth();

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

	public get budget(): number | null {
		return this.#budget;
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

	public static getInstance(): IAppConfig {
		if (!this.#instance) {
			this.#instance = new AppConfig(ELocaleCode.RU_RU, ECurrency.USD);
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
