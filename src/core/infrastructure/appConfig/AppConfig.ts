import { ECurrency } from '@core/infrastructure/currency/types';
import { ELocaleCode } from '@modules/intl';

export interface IAppConfig {
	readonly locale: ELocaleCode;
	readonly currency: ECurrency;
}

export class AppConfig implements IAppConfig {
	static #instance?: IAppConfig;

	#locale: ELocaleCode;
	#currency: ECurrency;

	private constructor(locale: ELocaleCode, currency: ECurrency) {
		this.#locale = locale;
		this.#currency = currency;
	}

	public get locale(): ELocaleCode {
		return this.#locale;
	}

	public get currency(): ECurrency {
		return this.#currency;
	}

	public static create(): IAppConfig {
		if (!this.#instance) {
			this.#instance = new AppConfig(ELocaleCode.RU_RU, ECurrency.USD);
		}

		return this.#instance;
	}
}
