import { Id } from '@/core/domain/types';
import { createVenueQuery } from '@/presentation/web-ui/modules/venues/queries/createVenueQuery';
import { QueryClient } from '@tanstack/react-query';

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
