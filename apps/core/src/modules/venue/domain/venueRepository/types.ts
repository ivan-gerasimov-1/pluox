import type { IRepository } from '@pluox/core/src/domain/repository/types';
import type { Id } from '@pluox/core/src/domain/types';

import type { IVenue } from '@pluox/core/src/modules/venue/domain/venueEntity/types';

export interface IVenueRepository
	extends IRepository<IVenue, TVenueFindOptions> {}

export type TVenueFindOptions = {
	id?: Id;
	name?: string;
	categoryId?: Id;
};
