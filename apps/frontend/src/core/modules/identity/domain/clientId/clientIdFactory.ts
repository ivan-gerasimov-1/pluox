import type { Id } from '@root/core/domain/types';
import type { IIdGenerator } from '@root/core/infrastructure/idGenerator/types';
import { ClientId } from '@root/core/modules/identity/domain/clientId/clientId';
import type {
	IClientId,
	IClientIdFactory,
} from '@root/core/modules/identity/domain/clientId/types';
import type { IClientIdDataSource } from '@root/core/modules/identity/infrastructure/clientIdDataSource/types';

export class ClientIdFactory implements IClientIdFactory {
	constructor(
		private readonly idGenerator: IIdGenerator,
		private readonly dataSource: IClientIdDataSource,
	) {}

	public create(existingId?: Id): IClientId {
		let id = existingId ?? this.dataSource.read() ?? this.createId();

		return new ClientId(id);
	}

	private createId(): Id {
		let id = this.idGenerator.getId();

		this.dataSource.create(id);

		return id;
	}
}
