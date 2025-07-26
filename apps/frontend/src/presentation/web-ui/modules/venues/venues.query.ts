import {
	type QueryClient,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';

import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';

import type { Id } from '@root/core/domain/types';
import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';

export const VENUE_QUERY_LIST = 'venueQueryList';
export const VENUE_QUERY_LIST_ARCHVIED = 'venueQueryListArchived';
export const VENUE_QUERY_ONE_ID = 'venueQueryOneId';

function createVenueQuery(type: 'list'): [];
function createVenueQuery(type: 'list:archived'): [];
function createVenueQuery(type: 'one:id', options: { id: Id }): [];
function createVenueQuery(
	type: 'list' | 'list:archived' | 'one:id',
	options?: { id: Id },
) {
	switch (type) {
		case 'list':
			return [VENUE_QUERY_LIST];
		case 'list:archived':
			return [VENUE_QUERY_LIST_ARCHVIED];
		case 'one:id':
			return [VENUE_QUERY_ONE_ID, options?.id];
		default: {
			let invalidType: never = type;
			throw new Error(`Unknown venue query type: ${invalidType}`);
		}
	}
}

export function useVenueListQuery(): (TVenueDTO & {
	categoryName: string;
})[] {
	let venueQueryService = useService(EServiceToken.VENUE_QUERY_SERVICE);
	let categoryService = useService(EServiceToken.CATEGORY_SERVICE);

	let { data } = useQuery({
		queryKey: createVenueQuery('list'),
		queryFn: () => {
			let venues = venueQueryService.getAll();

			return venues.map((venue) => ({
				...venue,
				categoryName: categoryService.getCategoryName(venue.categoryId),
			}));
		},
		refetchOnMount: false,
	});

	return data ?? [];
}

export function useVenueListArchivedQuery(): (TVenueDTO & {
	categoryName: string;
})[] {
	let venueQueryService = useService(EServiceToken.VENUE_QUERY_SERVICE);
	let categoryService = useService(EServiceToken.CATEGORY_SERVICE);

	let { data } = useQuery({
		queryKey: createVenueQuery('list:archived'),
		queryFn: () => {
			let venues = venueQueryService.getAll({
				archived: true,
			});

			return venues.map((venue) => ({
				...venue,
				categoryName: categoryService.getCategoryName(venue.categoryId),
			}));
		},
		refetchOnMount: false,
	});

	return data ?? [];
}

export function useVenueQueryById(
	id: Id,
): (TVenueDTO & { categoryName: string }) | null {
	let venueQueryService = useService(EServiceToken.VENUE_QUERY_SERVICE);
	let categoryService = useService(EServiceToken.CATEGORY_SERVICE);

	let { data } = useQuery({
		queryKey: createVenueQuery('one:id', {
			id,
		}),
		queryFn: () => {
			let venue = venueQueryService.getById(id);

			if (!venue) {
				return null;
			}

			let categoryName = categoryService.getCategoryName(venue.categoryId);

			return {
				...venue,
				categoryName,
			};
		},
		refetchOnMount: false,
	});

	return data ?? null;
}

export function useVenueRemoveMutation(options: { onSuccess?: () => void }) {
	let venueUseCase = useService(EServiceToken.VENUE_USE_CASE);
	let queryClient = useQueryClient();

	let result = useMutation({
		mutationFn: async (id: Id) => {
			return venueUseCase.remove(id);
		},
		onSuccess: async (_, id) => {
			await invalidateVenueOneByIdQuery(id, {
				queryClient,
			});

			if (options.onSuccess) {
				options.onSuccess();
			}
		},
	});

	return result;
}

export function useVenueArchiveMutation(options: { onSuccess?: () => void }) {
	let venueUseCase = useService(EServiceToken.VENUE_USE_CASE);
	let queryClient = useQueryClient();

	let result = useMutation({
		mutationFn: async (id: Id) => {
			return venueUseCase.archive(id);
		},
		onSuccess: async (_, id) => {
			await invalidateVenueOneByIdQuery(id, {
				queryClient,
			});

			if (options.onSuccess) {
				options.onSuccess();
			}
		},
	});

	return result;
}

export function invalidateVenueListQuery({
	queryClient,
}: {
	queryClient: QueryClient;
}) {
	return queryClient.invalidateQueries({
		queryKey: createVenueQuery('list'),
		refetchType: 'all',
	});
}

export function invalidateVenueOneByIdQuery(
	id: Id,
	{ queryClient }: { queryClient: QueryClient },
) {
	return Promise.all([
		invalidateVenueListQuery({
			queryClient,
		}),
		queryClient.invalidateQueries({
			queryKey: createVenueQuery('one:id', {
				id,
			}),
			refetchType: 'all',
		}),
	]);
}
