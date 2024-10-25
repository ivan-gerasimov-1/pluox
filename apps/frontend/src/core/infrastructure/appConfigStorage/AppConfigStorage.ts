import type { TAppConfig } from '@core/infrastructure/appConfig/types';
import { IAppConfigStorage } from '@core/infrastructure/appConfigStorage/types';
import { AppStorage } from '@core/infrastructure/appStorage/AppStorage';

export class AppConfigStorage
	extends AppStorage<TAppConfig>
	implements IAppConfigStorage
{
	static #instance: AppConfigStorage;

	static readonly #STORAGE_ID: string = 'appConfig';

	public static getInstance(): IAppConfigStorage {
		if (!this.#instance) {
			this.#instance = new AppConfigStorage(this.#STORAGE_ID);
		}

		return this.#instance;
	}
}
