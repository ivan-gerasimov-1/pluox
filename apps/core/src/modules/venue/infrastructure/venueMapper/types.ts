import type { IMapper } from '@pluox/core/src/infrastructure/mapper/types';

import type { TVenueDTO } from '@pluox/core/src/modules/venue/application/dto/venueDTO';
import type { IVenue } from '@pluox/core/src/modules/venue/domain/venueEntity/types';

export interface IVenueMapper extends IMapper<TVenueDTO, IVenue> {}
