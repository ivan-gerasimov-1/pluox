import { ECurrency } from '@root/core/modules/currency/domain/types';
import type { ELocaleCode } from '@root/core/modules/intl/domain/enums';
import type { IAppConfig } from '@root/core/modules/settings/domain/appConfig/types';

export class AppConfig implements IAppConfig {
	#locale: ELocaleCode;
	#currency: ECurrency;
	#availableCurrencies: ECurrency[];
	#budget: number | null;

	constructor(locale: ELocaleCode, currency: ECurrency) {
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
