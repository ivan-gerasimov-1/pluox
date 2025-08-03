import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';
import type { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { useQuery } from '@tanstack/react-query';

export function useCategoryListQuery(): TCategoryDTO[] {
	let categoryQueryService = useService(EServiceToken.CATEGORY_QUERY_SERVICE);

	let { data = [] } = useQuery({
		queryKey: ['categories'],
		queryFn: () => categoryQueryService.getAll(),
	});

	return data;
}
