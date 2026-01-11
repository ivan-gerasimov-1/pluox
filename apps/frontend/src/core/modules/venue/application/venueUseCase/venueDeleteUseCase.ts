import type { Id } from '@/core/domain/types';
import type { IVenueDeleteUseCase } from '@/core/modules/venue/application/venueUseCase/types';
import type { IVenueRepository } from '@/core/modules/venue/domain/venueRepository/types';

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
