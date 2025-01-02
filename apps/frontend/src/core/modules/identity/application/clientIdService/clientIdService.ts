import type { IClientIdService } from '@root/core/modules/identity/application/clientIdService/types';
import type {
	IClientId,
	IClientIdFactory,
} from '@root/core/modules/identity/domain/clientId/types';
import type { IClientIdDataSource } from '@root/core/modules/identity/infrastructure/clientIdDataSource/types';

export class ClientIdService implements IClientIdService {
	constructor(
		private readonly dataSource: IClientIdDataSource,
		private readonly clientIdFactory: IClientIdFactory,
	) {}

	public createClientId(): IClientId {
		let existingId = this.dataSource.read();

		let clientId = this.clientIdFactory.create(existingId);

		if (!existingId) {
			this.dataSource.create(clientId.getValue());
		}

		return clientId;
	}
}
