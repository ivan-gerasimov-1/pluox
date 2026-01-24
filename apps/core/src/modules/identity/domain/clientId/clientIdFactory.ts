import type { IIdGenerator } from '@core/domain/idGenerator/types';
import type { Id } from '@core/domain/types';
import { ClientId } from '@core/modules/identity/domain/clientId/clientId';
import type {
	IClientId,
	IClientIdFactory,
} from '@core/modules/identity/domain/clientId/types';

export class ClientIdFactory implements IClientIdFactory {
	constructor(private readonly idGenerator: IIdGenerator) {}

	public create(existingId?: Id | null): IClientId {
		let id = existingId ?? this.createId();

		return new ClientId(id);
	}

	private createId(): Id {
		let id = this.idGenerator.getId();

		return id;
	}
}
