import type { IIdGenerator } from '@root/core/domain/idGenerator/types';
import type { Id } from '@root/core/domain/types';

import type { TIdSource } from '@root/core/infrastructure/idGenerator/types';

export class IdGenerator implements IIdGenerator {
	constructor(private readonly idSource: TIdSource) {}

	public getId(): Id {
		return this.idSource();
	}
}
