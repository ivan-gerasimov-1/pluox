import type { IIdGenerator } from '@pluox/core/src/domain/idGenerator/types';
import type { ITemporal } from '@pluox/core/src/domain/temporal/types';

import type {
	TVenueCreateDTO,
	TVenueDTO,
} from '@pluox/core/src/modules/venue/application/dto/venueDTO';
import type { IVenueCreateUseCase } from '@pluox/core/src/modules/venue/application/venueUseCase/types';
import type { IVenue } from '@pluox/core/src/modules/venue/domain/venueEntity/types';
import type { IVenueRepository } from '@pluox/core/src/modules/venue/domain/venueRepository/types';
import type { IVenueMapper } from '@pluox/core/src/modules/venue/infrastructure/venueMapper/types';

export class VenueCreateUseCase implements IVenueCreateUseCase {
	constructor(
		private readonly venueRepository: IVenueRepository,
		private readonly venueMapper: IVenueMapper,
		private readonly idGenerator: IIdGenerator,
		private readonly temporal: ITemporal,
	) {}

	public execute(venueCreateDTO: TVenueCreateDTO): TVenueDTO {
		let venue = this.createVenue(venueCreateDTO);

		this.venueRepository.save(venue);

		return this.venueMapper.toDTO(venue);
	}

	private createVenue(venueCreateDTO: TVenueCreateDTO): IVenue {
		let id = this.idGenerator.getId();
		let currentDate = this.temporal.getISODateString();

		return this.venueMapper.toEntity({
			id,
			name: venueCreateDTO.name,
			categoryId: venueCreateDTO.categoryId,
			isArchived: venueCreateDTO.isArchived,
			createdAt: currentDate,
			modifiedAt: currentDate,
		});
	}
}
