import type {
	TFindManyOptions,
	TFindManyResult,
} from '@root/core/domain/repository/types';
import type { Id } from '@root/core/domain/types';
import type { IVenue } from '@root/core/modules/venue/domain/venueEntity/types';
import type {
	IVenueRepository,
	TVenueFindOptions,
} from '@root/core/modules/venue/domain/venueRepository/types';
import type { IVenueDataSource } from '@root/core/modules/venue/infrastructure/venueDataSource/types';
import type { IVenueMapper } from '@root/core/modules/venue/infrastructure/venueMapper/types';

export class VenueRepository implements IVenueRepository {
	constructor(
		private readonly venueDataSource: IVenueDataSource,
		private readonly venueMapper: IVenueMapper,
	) {}

	public save(venue: IVenue): IVenue {
		let venueDTO = this.venueMapper.toDTO(venue);
		let createdVenueDTO = this.venueDataSource.save(venueDTO);

		return this.venueMapper.toEntity(createdVenueDTO);
	}

	public findMany(
		options?: TFindManyOptions<TVenueFindOptions>,
	): TFindManyResult<IVenue> {
		throw new Error('Not Implemented');
	}

	public findOne(options: TVenueFindOptions): IVenue | null {
		throw new Error('Not Implemented');
	}

	public findById(id: Id): IVenue | null {
		throw new Error('Not Implemented');
	}

	public remove(id: Id): IVenue | null {
		throw new Error('Not Implemented');
	}
}
