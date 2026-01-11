import type { TVenueDTO } from '@/core/modules/venue/application/dto/venueDTO';
import type { IVenueQueryService } from '@/core/modules/venue/application/venueQueryService/types';
import type { IVenueRepository } from '@/core/modules/venue/domain/venueRepository/types';
import type { IVenueMapper } from '@/core/modules/venue/infrastructure/venueMapper/types';

export class VenueQueryService implements IVenueQueryService {
	constructor(
		private readonly venueRepository: IVenueRepository,
		private readonly venueMapper: IVenueMapper,
	) {}

	public getAll(options: { archived?: boolean } = {}): TVenueDTO[] {
		let result = this.venueRepository.findMany();

		if (result.total === 0) {
			return [];
		}

		return result.items
			.filter((venue) => {
				if (options.archived === undefined) {
					return true;
				}

				return venue.isArchived === options.archived;
			})
			.map((item) => this.venueMapper.toDTO(item));
	}

	public getById(id: string): TVenueDTO | null {
		let result = this.venueRepository.findById(id);

		return result ? this.venueMapper.toDTO(result) : null;
	}
}
