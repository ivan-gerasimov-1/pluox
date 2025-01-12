import type { IIdGenerator } from '@root/core/domain/idGenerator/types';
import type { ITemporal } from '@root/core/domain/temporal/types';
import type { TVenueCreateDTO } from '@root/core/modules/venue/application/dto/venueDTO';
import type { IVenueCreateUseCase } from '@root/core/modules/venue/application/venueUseCase/types';
import type { IVenue } from '@root/core/modules/venue/domain/venueEntity/types';
import type { IVenueRepository } from '@root/core/modules/venue/domain/venueRepository/types';
import type { IVenueMapper } from '@root/core/modules/venue/infrastructure/venueMapper/types';

export class VenueCreateUseCase implements IVenueCreateUseCase {
	constructor(
		private readonly venueRepository: IVenueRepository,
		private readonly venueMapper: IVenueMapper,
		private readonly idGenerator: IIdGenerator,
		private readonly temporal: ITemporal,
	) {}

	async execute(venueCreateDTO: TVenueCreateDTO): Promise<void> {
		let venue = this.createVenue(venueCreateDTO);

		this.venueRepository.save(venue);
	}

	private createVenue(venueCreateDTO: TVenueCreateDTO): IVenue {
		let id = this.idGenerator.getId();
		let currentDate = this.temporal.getISODateString();

		return this.venueMapper.toEntity({
			id,
			name: venueCreateDTO.name,
			categoryId: venueCreateDTO.categoryId,
			createdAt: currentDate,
			modifiedAt: currentDate,
		});
	}
}
