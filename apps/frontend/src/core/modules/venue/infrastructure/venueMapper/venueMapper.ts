import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';
import type { IVenue } from '@root/core/modules/venue/domain/venueEntity/types';
import { Venue } from '@root/core/modules/venue/domain/venueEntity/venue';
import type { IVenueMapper } from '@root/core/modules/venue/infrastructure/venueMapper/types';

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
