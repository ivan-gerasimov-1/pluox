import { LocalStorageDataSource } from '@root/core/infrastructure/dataSource/dataSource';
import type { TAppConfig } from '@core/infrastructure/appConfig/types';
import type { IAppConfigStorage } from '@core/infrastructure/appConfigStorage/types';

export class AppConfigStorage
	extends LocalStorageDataSource<TAppConfig>
	implements IAppConfigStorage
{
	static readonly #STORAGE_ID: string = 'appConfig';

	constructor() {
		super(AppConfigStorage.#STORAGE_ID);
	}
}
