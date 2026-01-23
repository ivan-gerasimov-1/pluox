import type { Id } from '@pluox/core/src/domain/types';

import type {
	TVenueDTO,
	TVenueUpdateDTO,
} from '@pluox/core/src/modules/venue/application/dto/venueDTO';
import type { IVenueUpdateUseCase } from '@pluox/core/src/modules/venue/application/venueUseCase/types';
import type { IVenue } from '@pluox/core/src/modules/venue/domain/venueEntity/types';
import type { IVenueRepository } from '@pluox/core/src/modules/venue/domain/venueRepository/types';
import type { IVenueMapper } from '@pluox/core/src/modules/venue/infrastructure/venueMapper/types';

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
