import type { IRepository } from '@core/domain/repository/types';
import type { Id } from '@core/domain/types';
import type { IProduct } from '@core/modules/product/domain/productEntity/types';

export interface IProductRepository extends IRepository<
	IProduct,
	TProductFindOptions
> {}

export type TProductFindOptions = {
	id?: Id;
};
