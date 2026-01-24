import type { TVenueDTO } from '@core/modules/venue/application/dto/venueDTO';

export interface IVenueQueryService {
	getAll(options?: { archived?: boolean }): TVenueDTO[];
	getById(id: string): TVenueDTO | null;
}
