import type { IMapper } from '@root/core/infrastructure/mapper/types';
import type { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';
import type { ICategory } from '@root/core/modules/category/domain/categoryEntity/types';

export interface ICategoryMapper extends IMapper<TCategoryDTO, ICategory> {}
