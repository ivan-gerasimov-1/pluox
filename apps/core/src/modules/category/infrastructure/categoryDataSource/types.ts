import type { IDataSource } from '@pluox/core/src/infrastructure/dataSource/types';

import type { TCategoryDTO } from '@pluox/core/src/modules/category/application/dto/categoryDTO';
import type { TCategoryFindOptions } from '@pluox/core/src/modules/category/domain/categoryRepository/types';

export interface ICategoryDataSource
	extends IDataSource<TCategoryDTO, TCategoryFindOptions> {}
