import type { TAppConfig } from '@core/infrastructure/appConfig/types';
import { IAppConfigStorage } from '@core/infrastructure/appConfigStorage/types';
import { AppStorage } from '@core/infrastructure/appStorage/AppStorage';

export class AppConfigStorage
	extends AppStorage<TAppConfig>
	implements IAppConfigStorage
{
	static #instance: AppConfigStorage;

	private readonly STORAGE_ID: string = 'appConfig';

	private constructor() {
		super();
	}

	public static getInstance(): IAppConfigStorage {
		if (!this.#instance) {
			this.#instance = new AppConfigStorage();
		}

		return this.#instance;
	}

	public load(): TAppConfig | null {
		return this.get(this.STORAGE_ID);
	}

	public save(config: TAppConfig): void {
		this.set(this.STORAGE_ID, config);
	}
}
