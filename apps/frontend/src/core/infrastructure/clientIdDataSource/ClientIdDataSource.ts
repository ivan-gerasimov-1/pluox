import { LocalStorageDataSource } from '@root/core/infrastructure/dataSource/dataSource';
import type { IClientIdDataSource } from '@root/core/infrastructure/clientIdDataSource/types';

import type { Id } from '@domain/types';

export class ClientIdDataSource
	extends LocalStorageDataSource<Id>
	implements IClientIdDataSource
{
	static readonly #STORAGE_ID: Id = 'clientId';

	constructor() {
		super(ClientIdDataSource.#STORAGE_ID);
	}
}
