import type { Id } from '@root/core/domain/types';
import type { IVenueDeleteUseCase } from '@root/core/modules/venue/application/venueUseCase/types';
import type { IVenueRepository } from '@root/core/modules/venue/domain/venueRepository/types';

/**
 * @todo
 * 1. Used venues should be unable to be deleted
 */
export class VenueDeleteUseCase implements IVenueDeleteUseCase {
	constructor(private readonly venueRepository: IVenueRepository) {}

	public execute(id: Id): void {
		let expense = this.venueRepository.findById(id);

		this.venueRepository.remove(id);
	}
}
