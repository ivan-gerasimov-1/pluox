import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';
import type { IVenueQueryService } from '@root/core/modules/venue/application/venueQueryService/types';
import type { IVenueRepository } from '@root/core/modules/venue/domain/venueRepository/types';
import type { IVenueMapper } from '@root/core/modules/venue/infrastructure/venueMapper/types';

export class VenueQueryService implements IVenueQueryService {
	constructor(
		private readonly venueRepository: IVenueRepository,
		private readonly venueMapper: IVenueMapper,
	) {}

	public getAll(): TVenueDTO[] {
		let result = this.venueRepository.findMany();

		if (result.total === 0) {
			return [];
		}

		return result.items.map((item) => this.venueMapper.toDTO(item));
	}
}
