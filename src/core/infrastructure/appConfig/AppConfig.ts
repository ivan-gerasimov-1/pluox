import { type ELocaleCode } from '@modules/intl';

export interface IAppConfig {}

export class AppConfig implements IAppConfig {
	static #instance?: IAppConfig;

	private constructor() {}

	public static create(): IAppConfig {
		if (!this.#instance) {
			this.#instance = new AppConfig();
		}

		return this.#instance;
	}
}
