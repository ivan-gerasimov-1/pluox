import { Repository } from '@root/core/domain/repository/repository';
import type { TProductDTO } from '@root/core/modules/product/application/dto/productDTO';
import type { IProduct } from '@root/core/modules/product/domain/productEntity/types';
import type {
	IProductRepository,
	TProductFindOptions,
} from '@root/core/modules/product/domain/productRepository/types';
import { IProductDataSource } from '@root/core/modules/product/infrastructure/productDataSource/types';
import { IProductMapper } from '@root/core/modules/product/infrastructure/productMapper/types';

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
