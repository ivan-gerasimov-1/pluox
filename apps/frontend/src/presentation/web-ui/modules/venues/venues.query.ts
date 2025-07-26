import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';

import type { Id } from '@root/core/domain/types';
import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';

import { createVenueQuery } from '@root/presentation/web-ui/modules/venues/queries/createVenueQuery';
import { invalidateVenueOneByIdQuery } from '@root/presentation/web-ui/modules/venues/queries/invalidateVenueQuery';

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
