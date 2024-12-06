import type { TAppConfig } from '@core/infrastructure/appConfig/types';
import { IAppConfigStorage } from '@core/infrastructure/appConfigStorage/types';
import { AppStorage } from '@core/infrastructure/appStorage/AppStorage';

export class AppConfigStorage
	extends AppStorage<TAppConfig>
	implements IAppConfigStorage
{
	public static readonly STORAGE_ID: string = 'appConfig';
}
