import type { IRepository } from '@/core/domain/repository/types';
import type { Id } from '@/core/domain/types';

import type { IVenue } from '@/core/modules/venue/domain/venueEntity/types';

export interface IVenueRepository
	extends IRepository<IVenue, TVenueFindOptions> {}

export type TVenueFindOptions = {
	id?: Id;
	name?: string;
	categoryId?: Id;
};
