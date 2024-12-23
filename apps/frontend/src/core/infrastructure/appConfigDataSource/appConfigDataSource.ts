import { LocalStorageDataSource } from '@root/core/infrastructure/dataSource/dataSource';
import type { TAppConfig } from '@core/infrastructure/appConfig/types';
import type { IAppConfigDataSource } from '@root/core/infrastructure/appConfigDataSource/types';

export class AppConfigDataSource
	extends LocalStorageDataSource<TAppConfig>
	implements IAppConfigDataSource
{
	static readonly #STORAGE_ID: string = 'appConfig';

	constructor() {
		super(AppConfigDataSource.#STORAGE_ID);
	}
}
