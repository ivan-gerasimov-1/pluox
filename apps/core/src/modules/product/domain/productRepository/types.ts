import type { IRepository } from '@pluox/core/src/domain/repository/types';
import type { Id } from '@pluox/core/src/domain/types';

import type { IProduct } from '@pluox/core/src/modules/product/domain/productEntity/types';

export interface IProductRepository
	extends IRepository<IProduct, TProductFindOptions> {}

export type TProductFindOptions = {
	id?: Id;
};
