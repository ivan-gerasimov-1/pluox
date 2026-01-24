import type { Id } from '@core/domain/types';

import type { TCategoryDTO } from '@core/modules/category/application/dto/categoryDTO';

export interface ICategoryQueryService {
	getAll(options?: { useWeights?: boolean }): TCategoryDTO[];
	getById(id: Id): TCategoryDTO | null;
}
