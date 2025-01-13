import { LocalStorageCollectionDataSource } from '@root/core/infrastructure/dataSource/localStorageCollectionDataSource';
import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';
import type { TVenueFindOptions } from '@root/core/modules/venue/domain/venueRepository/types';
import type { IVenueDataSource } from '@root/core/modules/venue/infrastructure/venueDataSource/types';

export class VenueLocalStorageDataSource
	extends LocalStorageCollectionDataSource<TVenueDTO, TVenueFindOptions>
	implements IVenueDataSource
{
	static readonly #STORAGE_ID = 'venues';

	constructor() {
		super(VenueLocalStorageDataSource.#STORAGE_ID);
	}
}
