import type { Id } from '@pluox/core/src/domain/types';

import type { IVenueDeleteUseCase } from '@pluox/core/src/modules/venue/application/venueUseCase/types';
import type { IVenueRepository } from '@pluox/core/src/modules/venue/domain/venueRepository/types';

/**
 * @todo LV-104
 * 1. Used venues should be unable to be deleted
 */
export class VenueDeleteUseCase implements IVenueDeleteUseCase {
	constructor(private readonly venueRepository: IVenueRepository) {}

	public execute(id: Id): void {
		this.venueRepository.remove(id);
	}
}
