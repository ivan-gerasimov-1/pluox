import type { Id } from '@core/domain/types';
import type { IVenueUnarchiveUseCase } from '@core/modules/venue/application/venueUseCase/types';
import type { IVenue } from '@core/modules/venue/domain/venueEntity/types';
import type { IVenueRepository } from '@core/modules/venue/domain/venueRepository/types';

export class VenueUnarchiveUseCase implements IVenueUnarchiveUseCase {
	constructor(private readonly venueRepository: IVenueRepository) {}

	public execute(id: Id): void {
		let venue = this.unarchiveVenue(id);

		this.venueRepository.save(venue);
	}

	private unarchiveVenue(id: Id): IVenue {
		let venue = this.venueRepository.findById(id);

		if (!venue) {
			throw new Error(`Venue with id "${id}" not found`);
		}

		venue.isArchived = false;

		return venue;
	}
}
