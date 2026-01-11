import type { IDatabase } from '@/core/infrastructure/database/types';
import { DataSource } from '@/core/infrastructure/dataSource/dataSource';
import type { TVenueDTO } from '@/core/modules/venue/application/dto/venueDTO';
import type { TVenueFindOptions } from '@/core/modules/venue/domain/venueRepository/types';
import type { IVenueDataSource } from '@/core/modules/venue/infrastructure/venueDataSource/types';

const VENUE_STORAGE_ID = 'venues';

export function venueDataSourceFactory(
	customStorage: IDatabase,
): IVenueDataSource {
	let collection = customStorage.collection(VENUE_STORAGE_ID);

	return new DataSource<TVenueDTO, TVenueFindOptions>(collection);
}
