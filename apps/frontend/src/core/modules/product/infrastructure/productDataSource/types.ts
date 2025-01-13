import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type { TProductDTO } from '@root/core/modules/product/application/dto/productDTO';
import type { TProductFindOptions } from '@root/core/modules/product/domain/productRepository/types';

export interface IProductDataSource
	extends IDataSource<TProductDTO, TProductFindOptions> {}
