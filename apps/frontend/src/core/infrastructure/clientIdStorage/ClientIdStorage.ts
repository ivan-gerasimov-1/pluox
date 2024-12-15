import { LocalStorageDataSource } from '@root/core/infrastructure/dataSource/dataSource';
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
