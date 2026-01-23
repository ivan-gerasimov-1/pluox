import type { Id } from '@pluox/core/src/domain/types';

import type { TCategoryDTO } from '@pluox/core/src/modules/category/application/dto/categoryDTO';

export interface ICategoryQueryService {
	getAll(options?: { useWeights?: boolean }): TCategoryDTO[];
	getById(id: Id): TCategoryDTO | null;
}
