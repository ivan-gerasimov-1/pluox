import type { IRepository } from '@pluox/core/src/domain/repository/types';

import type { ICategory } from '@pluox/core/src/modules/category/domain/categoryEntity/types';

export interface ICategoryRepository
	extends IRepository<ICategory, TCategoryFindOptions> {}

export type TCategoryFindOptions = {
	orderByWeight?: boolean;
};
