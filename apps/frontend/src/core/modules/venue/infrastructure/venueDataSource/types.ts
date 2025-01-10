import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';

export interface IVenueDataSource extends IDataSource<TVenueDTO> {}
