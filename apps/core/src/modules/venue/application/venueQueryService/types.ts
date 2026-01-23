import type { TVenueDTO } from '@pluox/core/src/modules/venue/application/dto/venueDTO';

export interface IVenueQueryService {
	getAll(options?: { archived?: boolean }): TVenueDTO[];
	getById(id: string): TVenueDTO | null;
}
