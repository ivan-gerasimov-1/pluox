import { useCallback } from 'react';

import type { Id } from '@root/core/domain/types';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';

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
