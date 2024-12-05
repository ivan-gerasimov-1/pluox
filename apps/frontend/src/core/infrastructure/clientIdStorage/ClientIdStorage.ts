import { AppStorage } from '@core/infrastructure/appStorage/AppStorage';
import type { IClientIdStorage } from '@core/infrastructure/clientIdStorage/types';
import type { Id } from '@domain/types';

export class ClientIdStorage
	extends AppStorage<Id>
	implements IClientIdStorage
{
	public static readonly STORAGE_ID: Id = 'clientId';
}
