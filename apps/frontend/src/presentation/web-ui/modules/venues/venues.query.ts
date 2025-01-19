import { useQuery } from '@tanstack/react-query';

import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';
import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';

import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';
import type { Id } from '@root/core/domain/types';

export const VENUE_QUERY_LIST = Symbol('venueQueryList').description;
export const VENUE_QUERY_BY_ID = Symbol('venueQueryById').description;

function createVenueQuery(type: 'list'): () => [];
function createVenueQuery(type: 'oneById'): (id: Id) => [];
function createVenueQuery(type: 'list' | 'oneById') {
	switch (type) {
		case 'list':
			return () => [VENUE_QUERY_LIST];
		case 'oneById':
			return (id: Id) => [VENUE_QUERY_BY_ID, id];
		default:
			let invalidType: never = type;
			throw new Error(`Unknown venue query type: ${invalidType}`);
	}
}

export function useVenueListQuery(): TVenueDTO[] {
	let venueQueryService = resolveService(EServiceToken.VENUE_QUERY_SERVICE);

	let { data } = useQuery({
		queryKey: createVenueQuery('list')(),
		queryFn: () => {
			return venueQueryService.getAll();
		},
	});

	return data ?? [];
}

export function useVenueByIdQuery(id: Id): TVenueDTO | null {
	let venueQueryService = resolveService(EServiceToken.VENUE_QUERY_SERVICE);

	let { data } = useQuery({
		queryKey: createVenueQuery('oneById')(id),
		queryFn: () => {
			return venueQueryService.getById(id);
		},
	});

	return data ?? null;
}
