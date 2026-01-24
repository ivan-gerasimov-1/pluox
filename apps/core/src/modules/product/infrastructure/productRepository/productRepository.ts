import { Repository } from '@core/infrastructure/repository/repository';

import type { TProductDTO } from '@core/modules/product/application/dto/productDTO';
import type { IProduct } from '@core/modules/product/domain/productEntity/types';
import type {
	IProductRepository,
	TProductFindOptions,
} from '@core/modules/product/domain/productRepository/types';
import { IProductDataSource } from '@core/modules/product/infrastructure/productDataSource/types';
import { IProductMapper } from '@core/modules/product/infrastructure/productMapper/types';

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
