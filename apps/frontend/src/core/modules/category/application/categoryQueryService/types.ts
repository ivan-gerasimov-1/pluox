import type { Id } from '@root/core/domain/types';
import type { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';

export interface ICategoryQueryService {
	getAll(options?: { useWeights?: boolean }): TCategoryDTO[];
	getById(id: Id): TCategoryDTO | null;
}
