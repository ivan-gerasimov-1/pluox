import { LocalStorageObjectDataSource } from '@root/core/infrastructure/dataSource/localStorageObjectDataSource';
import type { TAppConfig } from '@root/core/modules/settings/domain/appConfig/types';
import type { IAppConfigDataSource } from '@root/core/modules/settings/infrastructure/appConfigDataSource/types';

export class AppConfigDataSource
	extends LocalStorageObjectDataSource<TAppConfig>
	implements IAppConfigDataSource
{
	static readonly #STORAGE_ID: string = 'appConfig';

	constructor() {
		super(AppConfigDataSource.#STORAGE_ID);
	}
}
