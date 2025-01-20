import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';

import { useNavigation } from '@root/presentation/web-ui/hooks/useNavigation';

import type { Id } from '@root/core/domain/types';
import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';

export const VENUE_QUERY_LIST = 'venueQueryList';
export const VENUE_QUERY_BY_ID = 'venueQueryById';

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
	let venueQueryService = useService(EServiceToken.VENUE_QUERY_SERVICE);

	let { data } = useQuery({
		queryKey: createVenueQuery('list')(),
		queryFn: () => {
			return venueQueryService.getAll();
		},
	});

	return data ?? [];
}

export function useVenueQueryById(id: Id): TVenueDTO | null {
	let venueQueryService = useService(EServiceToken.VENUE_QUERY_SERVICE);

	let { data } = useQuery({
		queryKey: createVenueQuery('oneById')(id),
		queryFn: () => {
			return venueQueryService.getById(id);
		},
		refetchOnMount: false,
	});

	return data ?? null;
}

export function useVenueRemoveMutation() {
	let venueUseCase = useService(EServiceToken.VENUE_USE_CASE);
	let queryClient = useQueryClient();
	let navigation = useNavigation();

	let result = useMutation({
		mutationFn: async (id: Id) => {
			return venueUseCase.remove(id);
		},
		onSuccess: async (_, id) => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: createVenueQuery('list')(),
					refetchType: 'all',
				}),
				queryClient.invalidateQueries({
					queryKey: createVenueQuery('oneById')(id),
					refetchType: 'all',
				}),
			]);

			navigation.venueListPage();
		},
	});

	return result;
}
