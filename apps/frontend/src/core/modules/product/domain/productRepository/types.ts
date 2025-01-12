import type { IRepository } from '@root/core/domain/repository/types';
import type { Id } from '@root/core/domain/types';
import type { IProduct } from '@root/core/modules/product/domain/productEntity/types';

export interface IProductRepository
	extends IRepository<IProduct, TProductFindOptions> {}

export type TProductFindOptions = {
	id?: Id;
};
