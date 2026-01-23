import type { IIdGenerator } from '@pluox/core/src/domain/idGenerator/types';
import type { Id } from '@pluox/core/src/domain/types';

import type { TIdSource } from '@pluox/core/src/infrastructure/idGenerator/types';

export class IdGenerator implements IIdGenerator {
	constructor(private readonly idSource: TIdSource) {}

	public getId(): Id {
		return this.idSource();
	}
}
