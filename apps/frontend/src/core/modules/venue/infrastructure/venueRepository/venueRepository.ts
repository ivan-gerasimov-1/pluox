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

export class VenueRepository implements IVenueRepository {
	constructor() {}

	public save(venue: IVenue): IVenue {
		throw new Error('Not Implemented');
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
