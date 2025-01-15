import type { ICustomStorage } from '@root/core/infrastructure/customStorage/types';
import { LocalStorageCollectionDataSource } from '@root/core/infrastructure/dataSource/localStorageCollectionDataSource';
import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';
import type { TVenueFindOptions } from '@root/core/modules/venue/domain/venueRepository/types';
import type { IVenueDataSource } from '@root/core/modules/venue/infrastructure/venueDataSource/types';

const VENUE_STORAGE_ID = 'venues';

export function venueDataSourceFactory(
	customStorage: ICustomStorage,
): IVenueDataSource {
	let collection = customStorage.collection(VENUE_STORAGE_ID);

	return new LocalStorageCollectionDataSource<TVenueDTO, TVenueFindOptions>(
		collection,
	);
}
