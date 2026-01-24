import type { IIdGenerator } from '@core/domain/idGenerator/types';
import type { ITemporal } from '@core/domain/temporal/types';
import type {
	TVenueCreateDTO,
	TVenueDTO,
} from '@core/modules/venue/application/dto/venueDTO';
import type { IVenueCreateUseCase } from '@core/modules/venue/application/venueUseCase/types';
import type { IVenue } from '@core/modules/venue/domain/venueEntity/types';
import type { IVenueRepository } from '@core/modules/venue/domain/venueRepository/types';
import type { IVenueMapper } from '@core/modules/venue/infrastructure/venueMapper/types';

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
