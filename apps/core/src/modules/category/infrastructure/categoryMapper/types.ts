import type { IMapper } from '@pluox/core/src/infrastructure/mapper/types';

import type { TCategoryDTO } from '@pluox/core/src/modules/category/application/dto/categoryDTO';
import type { ICategory } from '@pluox/core/src/modules/category/domain/categoryEntity/types';

export interface ICategoryMapper extends IMapper<TCategoryDTO, ICategory> {}
