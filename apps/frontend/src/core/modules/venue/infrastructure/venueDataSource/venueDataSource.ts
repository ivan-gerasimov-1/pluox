import { LocalStorageDataSource } from '@root/core/infrastructure/dataSource/dataSource';
import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';
import type { IVenueDataSource } from '@root/core/modules/venue/infrastructure/venueDataSource/types';

export class VenueLocalStorageDataSource
	extends LocalStorageDataSource<TVenueDTO>
	implements IVenueDataSource
{
	static readonly #STORAGE_ID = 'venues';

	constructor() {
		super(VenueLocalStorageDataSource.#STORAGE_ID);
	}
}
