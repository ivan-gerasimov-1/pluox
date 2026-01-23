import { Repository } from '@pluox/core/src/infrastructure/repository/repository';

import type { TVenueDTO } from '@pluox/core/src/modules/venue/application/dto/venueDTO';
import type { IVenue } from '@pluox/core/src/modules/venue/domain/venueEntity/types';
import type {
	IVenueRepository,
	TVenueFindOptions,
} from '@pluox/core/src/modules/venue/domain/venueRepository/types';
import { IVenueDataSource } from '@pluox/core/src/modules/venue/infrastructure/venueDataSource/types';
import { IVenueMapper } from '@pluox/core/src/modules/venue/infrastructure/venueMapper/types';

export class VenueRepository
	extends Repository<IVenue, TVenueDTO, TVenueFindOptions>
	implements IVenueRepository
{
	constructor(
		private readonly venueDataSource: IVenueDataSource,
		private readonly venueMapper: IVenueMapper,
	) {
		super(venueDataSource, venueMapper);
	}
}
