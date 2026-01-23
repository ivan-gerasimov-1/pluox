import type { IDataSource } from '@pluox/core/src/infrastructure/dataSource/types';

import type { TVenueDTO } from '@pluox/core/src/modules/venue/application/dto/venueDTO';
import type { TVenueFindOptions } from '@pluox/core/src/modules/venue/domain/venueRepository/types';

export interface IVenueDataSource
	extends IDataSource<TVenueDTO, TVenueFindOptions> {}
