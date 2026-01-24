import type { IMapper } from '@core/infrastructure/mapper/types';
import type { TCategoryDTO } from '@core/modules/category/application/dto/categoryDTO';
import type { ICategory } from '@core/modules/category/domain/categoryEntity/types';

export interface ICategoryMapper extends IMapper<TCategoryDTO, ICategory> {}
