import { Repository } from '@pluox/core/src/infrastructure/repository/repository';

import type { TProductDTO } from '@pluox/core/src/modules/product/application/dto/productDTO';
import type { IProduct } from '@pluox/core/src/modules/product/domain/productEntity/types';
import type {
	IProductRepository,
	TProductFindOptions,
} from '@pluox/core/src/modules/product/domain/productRepository/types';
import { IProductDataSource } from '@pluox/core/src/modules/product/infrastructure/productDataSource/types';
import { IProductMapper } from '@pluox/core/src/modules/product/infrastructure/productMapper/types';

export class ProductRepository
	extends Repository<IProduct, TProductDTO, TProductFindOptions>
	implements IProductRepository
{
	constructor(
		private readonly productDataSource: IProductDataSource,
		private readonly productMapper: IProductMapper,
	) {
		super(productDataSource, productMapper);
	}
}
