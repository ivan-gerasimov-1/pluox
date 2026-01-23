import type { IDataSource } from '@pluox/core/src/infrastructure/dataSource/types';

import type { TProductDTO } from '@pluox/core/src/modules/product/application/dto/productDTO';
import type { TProductFindOptions } from '@pluox/core/src/modules/product/domain/productRepository/types';

export interface IProductDataSource
	extends IDataSource<TProductDTO, TProductFindOptions> {}
