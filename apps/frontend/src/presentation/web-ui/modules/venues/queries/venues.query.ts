import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';

import type { Id } from '@root/core/domain/types';
import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';

import { createVenueQuery } from '@root/presentation/web-ui/modules/venues/queries/createVenueQuery';
import { invalidateVenueOneByIdQuery } from '@root/presentation/web-ui/modules/venues/queries/invalidateVenueQuery';

export function useVenueListQuery(options?: {
	archived?: boolean;
}): (TVenueDTO & {
	categoryName: string;
})[] {
	let venueQueryService = useService(EServiceToken.VENUE_QUERY_SERVICE);
	let categoryService = useService(EServiceToken.CATEGORY_SERVICE);

	let queryParams: {
		archived?: boolean;
	} = {};

	if (options?.archived !== undefined) {
		queryParams.archived = options.archived;
	}

	let { data } = useQuery({
		queryKey: createVenueQuery('list', queryParams),
		queryFn: () => {
			let venues = venueQueryService.getAll(queryParams);

			return venues.map((venue) => ({
				...venue,
				categoryName: categoryService.getCategoryName(venue.categoryId),
			}));
		},
		refetchOnMount: false,
	});

	return data ?? [];
}

export function useVenueListUnarchivedQuery(): (TVenueDTO & {
	categoryName: string;
})[] {
	return useVenueListQuery({
		archived: false,
	});
}

export function useVenueListArchivedQuery(): (TVenueDTO & {
	categoryName: string;
})[] {
	return useVenueListQuery({
		archived: true,
	});
}

export function useVenueOneByIdQuery(
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
