import type {
	TIdSource,
	IIdGenerator,
} from '@core/infrastructure/idGenerator/types';

import type { Id } from '@domain/types';

export class IdGenerator implements IIdGenerator {
	constructor(private readonly idSource: TIdSource) {}

	public getId(): Id {
		return this.idSource();
	}
}
