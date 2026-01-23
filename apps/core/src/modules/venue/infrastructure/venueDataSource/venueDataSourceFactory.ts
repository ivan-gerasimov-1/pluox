import type { IDatabase } from '@pluox/core/src/infrastructure/database/types';
import { DataSource } from '@pluox/core/src/infrastructure/dataSource/dataSource';

import type { TVenueDTO } from '@pluox/core/src/modules/venue/application/dto/venueDTO';
import type { TVenueFindOptions } from '@pluox/core/src/modules/venue/domain/venueRepository/types';
import type { IVenueDataSource } from '@pluox/core/src/modules/venue/infrastructure/venueDataSource/types';

const VENUE_STORAGE_ID = 'venues';

export function venueDataSourceFactory(
	customStorage: IDatabase,
): IVenueDataSource {
	let collection = customStorage.collection(VENUE_STORAGE_ID);

	return new DataSource<TVenueDTO, TVenueFindOptions>(collection);
}
