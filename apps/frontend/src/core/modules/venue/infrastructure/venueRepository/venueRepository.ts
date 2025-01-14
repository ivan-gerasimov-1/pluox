import { Repository } from '@root/core/domain/repository/repository';
import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';
import type { IVenue } from '@root/core/modules/venue/domain/venueEntity/types';
import type {
	IVenueRepository,
	TVenueFindOptions,
} from '@root/core/modules/venue/domain/venueRepository/types';
import { IVenueDataSource } from '@root/core/modules/venue/infrastructure/venueDataSource/types';
import { IVenueMapper } from '@root/core/modules/venue/infrastructure/venueMapper/types';

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
