import { LocalStorageCollectionDataSource } from '@root/core/infrastructure/dataSource/localStorageCollectionDataSource';
import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';
import type { TVenueFindOptions } from '@root/core/modules/venue/domain/venueRepository/types';
import type { IVenueDataSource } from '@root/core/modules/venue/infrastructure/venueDataSource/types';

const VENUE_STORAGE_ID = 'venues';

export function venueDataSourceFactory(): IVenueDataSource {
	return new LocalStorageCollectionDataSource<TVenueDTO, TVenueFindOptions>(
		window.localStorage,
		{
			id: VENUE_STORAGE_ID,
		},
	);
}
