import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type { TProductDTO } from '@root/core/modules/product/application/dto/productDTO';

export interface IProductDataSource extends IDataSource<TProductDTO> {}
