import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';

export interface IVenueQueryService {
	getAll(options?: { archived?: boolean }): TVenueDTO[];
	getById(id: string): TVenueDTO | null;
}
