import type { IDatabase } from '@root/core/infrastructure/database/types';
import { CollectionDataSource } from '@root/core/infrastructure/dataSource/collectionDataSource';
import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';
import type { TVenueFindOptions } from '@root/core/modules/venue/domain/venueRepository/types';
import type { IVenueDataSource } from '@root/core/modules/venue/infrastructure/venueDataSource/types';

const VENUE_STORAGE_ID = 'venues';

export function venueDataSourceFactory(
	customStorage: IDatabase,
): IVenueDataSource {
	let collection = customStorage.collection(VENUE_STORAGE_ID);

	return new CollectionDataSource<TVenueDTO, TVenueFindOptions>(collection);
}
