import type { IRepository } from '@root/core/domain/repository/types';
import type { Id } from '@root/core/domain/types';
import type { IVenue } from '@root/core/modules/venue/domain/venueEntity/types';

export interface IVenueRepository
	extends IRepository<IVenue, TVenueFindOptions> {}

export type TVenueFindOptions = {
	id?: Id;
	name?: string;
	categoryId?: Id;
};
