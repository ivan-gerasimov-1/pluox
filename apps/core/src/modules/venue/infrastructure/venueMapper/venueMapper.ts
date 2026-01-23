import type { TVenueDTO } from '@pluox/core/src/modules/venue/application/dto/venueDTO';
import type { IVenue } from '@pluox/core/src/modules/venue/domain/venueEntity/types';
import { Venue } from '@pluox/core/src/modules/venue/domain/venueEntity/venue';
import type { IVenueMapper } from '@pluox/core/src/modules/venue/infrastructure/venueMapper/types';

export class VenueMapper implements IVenueMapper {
	public toDTO(venue: IVenue): TVenueDTO {
		return {
			id: venue.id,
			name: venue.name,
			categoryId: venue.categoryId,
			isArchived: venue.isArchived,
			createdAt: venue.createdAt,
			modifiedAt: venue.modifiedAt,
		};
	}

	public toEntity(venueDTO: TVenueDTO): IVenue {
		return new Venue(
			venueDTO.id,
			venueDTO.name,
			venueDTO.categoryId,
			venueDTO.isArchived,
			venueDTO.createdAt,
			venueDTO.modifiedAt,
		);
	}
}
