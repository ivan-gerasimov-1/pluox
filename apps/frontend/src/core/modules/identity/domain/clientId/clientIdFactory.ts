import type { Id } from '@root/core/domain/types';
import type { IIdGenerator } from '@root/core/domain/idGenerator/types';
import { ClientId } from '@root/core/modules/identity/domain/clientId/clientId';
import type {
	IClientId,
	IClientIdFactory,
} from '@root/core/modules/identity/domain/clientId/types';

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
