import type { IMapper } from '@root/core/infrastructure/mapper/types';
import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';
import type { IVenue } from '@root/core/modules/venue/domain/venueEntity/types';

export interface IVenueMapper extends IMapper<TVenueDTO, IVenue> {}
