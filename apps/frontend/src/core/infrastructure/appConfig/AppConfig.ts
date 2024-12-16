import { ECurrency } from '@root/core/modules/currency/domain/types';
import { ELocaleCode } from '@core/infrastructure/intl/enums';

import { InvalidMonthError } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/errors';
import { monthGuard } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/typeGuards';
import type { TMonth } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/types';

export interface IAppConfig {
	locale: ELocaleCode;
	currency: ECurrency;
	availableCurrencies: ECurrency[];
	budget: number | null;

	readonly currentMonth: TMonth;
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

	#currentMonth: TMonth;

	#openExchangeRates: {
		apiUrl: string;
		apiKey: string;
	};

	#apiUrl: string;

	constructor(locale: ELocaleCode, currency: ECurrency, apiUrl: string) {
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

	private getCurrentMonth(): TMonth {
		const month = new Date().getMonth();

		if (!monthGuard(month)) {
			throw new InvalidMonthError(month);
		}

		return month;
	}
}
