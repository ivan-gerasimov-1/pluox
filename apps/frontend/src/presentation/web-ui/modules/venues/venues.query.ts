import { useQuery } from '@tanstack/react-query';

import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';
import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';

import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';
import type { Id } from '@root/core/domain/types';

export const QUERY_VENUES_LIST = Symbol('venueList').description;

export function getVenueList() {
	let venueQueryService = resolveService(EServiceToken.VENUE_QUERY_SERVICE);

	return venueQueryService.getAll();
}

export function getVenueById(id: Id) {
	let venueQueryService = resolveService(EServiceToken.VENUE_QUERY_SERVICE);

	return venueQueryService.getById(id);
}

export function useVenueListQuery(): TVenueDTO[] {
	let { data } = useQuery({
		queryKey: [QUERY_VENUES_LIST],
		queryFn: getVenueList,
	});

	return data ?? [];
}

export function useVenueQuery(id: Id): TVenueDTO | null {
	let { data } = useQuery({
		queryKey: [QUERY_VENUES_LIST, 'id'],
		queryFn: () => getVenueById(id),
	});

	return data ?? null;
}
