import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';
import type { TVenueFindOptions } from '@root/core/modules/venue/domain/venueRepository/types';

export interface IVenueDataSource
	extends IDataSource<TVenueDTO, TVenueFindOptions> {}
