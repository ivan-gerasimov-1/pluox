import type { IIdGenerator } from '@/core/domain/idGenerator/types';
import type { Id } from '@/core/domain/types';

import type { TIdSource } from '@/core/infrastructure/idGenerator/types';

export class IdGenerator implements IIdGenerator {
	constructor(private readonly idSource: TIdSource) {}

	public getId(): Id {
		return this.idSource();
	}
}
