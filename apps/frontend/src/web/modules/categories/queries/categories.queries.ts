import { EServiceToken } from '@pluox/core/src/infrastructure/serviceContainer/types';
import type { TCategoryDTO } from '@pluox/core/src/modules/category/application/dto/categoryDTO';
import { useQuery } from '@tanstack/react-query';

import { useService } from '@/web/modules/serviceContainer/useService';

export function useCategoryListQuery(): TCategoryDTO[] {
	let categoryQueryService = useService(EServiceToken.CATEGORY_QUERY_SERVICE);

	let { data = [] } = useQuery({
		queryKey: ['categories'],
		queryFn: () => categoryQueryService.getAll(),
	});

	return data;
}
