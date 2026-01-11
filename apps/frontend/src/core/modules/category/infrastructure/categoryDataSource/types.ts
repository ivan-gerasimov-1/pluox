import type { IDataSource } from '@/core/infrastructure/dataSource/types';
import type { TCategoryDTO } from '@/core/modules/category/application/dto/categoryDTO';
import type { TCategoryFindOptions } from '@/core/modules/category/domain/categoryRepository/types';

export interface ICategoryDataSource
	extends IDataSource<TCategoryDTO, TCategoryFindOptions> {}
