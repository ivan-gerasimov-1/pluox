import type { IDataSource } from '@/core/infrastructure/dataSource/types';
import type { TProductDTO } from '@/core/modules/product/application/dto/productDTO';
import type { TProductFindOptions } from '@/core/modules/product/domain/productRepository/types';

export interface IProductDataSource
	extends IDataSource<TProductDTO, TProductFindOptions> {}
