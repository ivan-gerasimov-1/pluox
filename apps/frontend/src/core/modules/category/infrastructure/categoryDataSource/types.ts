import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';
import type { ICategoryFindOptions } from '@root/core/modules/category/domain/categoryRepository/types';

export interface ICategoryDataSource
	extends IDataSource<TCategoryDTO, ICategoryFindOptions> {}
