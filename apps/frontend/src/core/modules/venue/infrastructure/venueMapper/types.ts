import type { IMapper } from '@/core/infrastructure/mapper/types';

import type { TVenueDTO } from '@/core/modules/venue/application/dto/venueDTO';
import type { IVenue } from '@/core/modules/venue/domain/venueEntity/types';

export interface IVenueMapper extends IMapper<TVenueDTO, IVenue> {}
