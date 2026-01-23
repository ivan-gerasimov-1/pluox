import type { Id } from '@pluox/core/src/domain/types';
import { EServiceToken } from '@pluox/core/src/infrastructure/serviceContainer/types';
import type {
	TVenueCreateDTO,
	TVenueDTO,
	TVenueUpdateDTO,
} from '@pluox/core/src/modules/venue/application/dto/venueDTO';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useService } from '@/web/modules/serviceContainer/useService';
import { createVenueQuery } from '@/web/modules/venues/queries/createVenueQuery';
import {
	invalidateVenueListQuery,
	invalidateVenueOneByIdQuery,
} from '@/web/modules/venues/queries/invalidateVenueQuery';

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

export function useVenueCreateMutation(options?: {
	onSuccess?: (venueDto: TVenueDTO) => void;
}) {
	let venueUseCase = useService(EServiceToken.VENUE_USE_CASE);
	let queryClient = useQueryClient();

	let result = useMutation({
		mutationFn: async (venueData: TVenueCreateDTO) => {
			return venueUseCase.create(venueData);
		},
		onSuccess: async (venueDto: TVenueDTO) => {
			await invalidateVenueListQuery({
				queryClient,
			});

			if (options?.onSuccess) {
				options.onSuccess(venueDto);
			}
		},
	});

	return result;
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

export function useVenueUpdateMutation(
	id: Id,
	options?: { onSuccess?: () => void },
) {
	let queryClient = useQueryClient();
	let venueUseCase = useService(EServiceToken.VENUE_USE_CASE);

	let result = useMutation({
		mutationFn: async (venueUpdateDto: TVenueUpdateDTO) => {
			return venueUseCase.update(id, venueUpdateDto);
		},
		onSuccess: async () => {
			await invalidateVenueOneByIdQuery(id, {
				queryClient,
			});

			if (options?.onSuccess) {
				options.onSuccess();
			}
		},
	});

	return result;
}

export function useVenueArchiveMutation(options?: { onSuccess?: () => void }) {
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

			if (options?.onSuccess) {
				options.onSuccess();
			}
		},
	});

	return result;
}

export function useVenueUnarchiveMutation(options?: {
	onSuccess?: () => void;
}) {
	let venueUseCase = useService(EServiceToken.VENUE_USE_CASE);
	let queryClient = useQueryClient();

	let result = useMutation({
		mutationFn: async (id: Id) => {
			return venueUseCase.unarchive(id);
		},
		onSuccess: async (_, id) => {
			await invalidateVenueOneByIdQuery(id, {
				queryClient,
			});

			if (options?.onSuccess) {
				options.onSuccess();
			}
		},
	});

	return result;
}
