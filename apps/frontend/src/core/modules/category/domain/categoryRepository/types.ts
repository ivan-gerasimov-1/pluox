import type { IRepository } from '@root/core/domain/repository/types';
import type { ICategory } from '@root/core/modules/category/domain/categoryEntity/types';

export interface ICategoryRepository
	extends IRepository<ICategory, ICategoryFindOptions> {}

export interface ICategoryFindOptions {
	orderByWeight?: boolean;
}
