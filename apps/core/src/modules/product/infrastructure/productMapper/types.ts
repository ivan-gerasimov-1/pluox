import type { IMapper } from '@pluox/core/src/infrastructure/mapper/types';

import type { TProductDTO } from '@pluox/core/src/modules/product/application/dto/productDTO';
import type { IProduct } from '@pluox/core/src/modules/product/domain/productEntity/types';

export interface IProductMapper extends IMapper<TProductDTO, IProduct> {}
