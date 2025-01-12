import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';

export interface IVenueQueryService {
	getAll(): TVenueDTO[];
	getById(id: string): TVenueDTO | null;
}
