import { EServiceToken } from '@/core/infrastructure/serviceContainer/types';
import type { TCategoryDTO } from '@/core/modules/category/application/dto/categoryDTO';
import { useService } from '@/presentation/web-ui/modules/serviceContainer/useService';
import { useQuery } from '@tanstack/react-query';

export function useCategoryListQuery(): TCategoryDTO[] {
	let categoryQueryService = useService(EServiceToken.CATEGORY_QUERY_SERVICE);

	let { data = [] } = useQuery({
		queryKey: ['categories'],
		queryFn: () => categoryQueryService.getAll(),
	});

	return data;
}
