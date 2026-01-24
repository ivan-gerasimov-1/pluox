import type { Id } from '@core/domain/types';

import type {
	TVenueDTO,
	TVenueUpdateDTO,
} from '@core/modules/venue/application/dto/venueDTO';
import type { IVenueUpdateUseCase } from '@core/modules/venue/application/venueUseCase/types';
import type { IVenue } from '@core/modules/venue/domain/venueEntity/types';
import type { IVenueRepository } from '@core/modules/venue/domain/venueRepository/types';
import type { IVenueMapper } from '@core/modules/venue/infrastructure/venueMapper/types';

export class VenueUpdateUseCase implements IVenueUpdateUseCase {
	constructor(
		private readonly venueRepository: IVenueRepository,
		private readonly venueMapper: IVenueMapper,
	) {}

	public execute(id: Id, venueUpdateDto: TVenueUpdateDTO): TVenueDTO {
		let venue = this.updateVenue(id, venueUpdateDto);

		return this.venueMapper.toDTO(venue);
	}

	private updateVenue(id: Id, venueUpdateDto: TVenueUpdateDTO): IVenue {
		let venue = this.venueRepository.findById(id);

		if (!venue) {
			throw new Error(`Venue with id "${id}" not found`);
		}

		for (let key of Object.keys(venueUpdateDto)) {
			let venueField = key as keyof TVenueUpdateDTO;

			if (venueUpdateDto[venueField] === undefined) {
				continue;
			}

			venue[venueField] = venueUpdateDto[venueField];
		}

		return this.venueRepository.save(venue);
	}
}
