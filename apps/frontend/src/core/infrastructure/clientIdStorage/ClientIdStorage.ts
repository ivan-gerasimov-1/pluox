import { LocalStorageDataSource } from '@core/infrastructure/appStorage/AppStorage';
import type { IClientIdStorage } from '@core/infrastructure/clientIdStorage/types';

import type { Id } from '@domain/types';

export class ClientIdStorage
	extends LocalStorageDataSource<Id>
	implements IClientIdStorage
{
	static readonly #STORAGE_ID: Id = 'clientId';

	constructor() {
		super(ClientIdStorage.#STORAGE_ID);
	}
}
