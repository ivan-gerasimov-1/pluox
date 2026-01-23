import { useCallback } from 'react';

import type { Id } from '@/core/domain/types';

import { EServiceToken } from '@/presentation/web/modules/serviceContainer/enums';
import { useService } from '@/presentation/web/modules/serviceContainer/useService';

export function useVenueName() {
	let venueQueryService = useService(EServiceToken.VENUE_QUERY_SERVICE);

	return useCallback(
		(id: Id | null) => {
			if (id === null) {
				return null;
			}

			return venueQueryService.getById(id)?.name;
		},
		[venueQueryService],
	);
}
