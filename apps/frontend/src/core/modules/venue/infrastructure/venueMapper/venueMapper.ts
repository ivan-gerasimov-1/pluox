import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';
import type { IVenue } from '@root/core/modules/venue/domain/venueEntity/types';
import type { IVenueMapper } from '@root/core/modules/venue/infrastructure/venueMapper/types';

export class VenueMapper implements IVenueMapper {
	constructor() {}

	toDTO(entity: IVenue): TVenueDTO {
		throw new Error('Not Implemented');
	}

	toEntity(dto: TVenueDTO): IVenue {
		throw new Error('Not Implemented');
	}
}
