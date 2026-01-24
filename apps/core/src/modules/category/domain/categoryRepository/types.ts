import type { IRepository } from '@core/domain/repository/types';
import type { ICategory } from '@core/modules/category/domain/categoryEntity/types';

export interface ICategoryRepository extends IRepository<
	ICategory,
	TCategoryFindOptions
> {}

export type TCategoryFindOptions = {
	orderByWeight?: boolean;
};
