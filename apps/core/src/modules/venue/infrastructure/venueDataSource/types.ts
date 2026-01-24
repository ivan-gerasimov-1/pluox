import type { IDataSource } from '@core/infrastructure/dataSource/types';

import type { TVenueDTO } from '@core/modules/venue/application/dto/venueDTO';
import type { TVenueFindOptions } from '@core/modules/venue/domain/venueRepository/types';

export interface IVenueDataSource extends IDataSource<
	TVenueDTO,
	TVenueFindOptions
> {}
