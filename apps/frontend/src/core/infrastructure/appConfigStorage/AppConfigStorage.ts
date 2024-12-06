import { AppStorage } from '@core/infrastructure/appStorage/AppStorage';
import type { TAppConfig } from '@core/infrastructure/appConfig/types';
import type { IAppConfigStorage } from '@core/infrastructure/appConfigStorage/types';

export class AppConfigStorage
	extends AppStorage<TAppConfig>
	implements IAppConfigStorage
{
	static readonly #STORAGE_ID: string = 'appConfig';

	constructor() {
		super(AppConfigStorage.#STORAGE_ID);
	}
}
