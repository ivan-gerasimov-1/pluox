import type {
	TFindManyOptions,
	TFindManyResult,
} from '@root/core/domain/repository/types';
import type { Id } from '@root/core/domain/types';
import type { IProduct } from '@root/core/modules/product/domain/productEntity/types';
import type {
	IProductRepository,
	TProductFindOptions,
} from '@root/core/modules/product/domain/productRepository/types';

export class ProductRepository implements IProductRepository {
	constructor() {}

	public save(entity: IProduct): IProduct {
		throw new Error('Not Implemented');
	}

	public findMany(
		options: TFindManyOptions<TProductFindOptions>,
	): TFindManyResult<IProduct> {
		throw new Error('Not Implemented');
	}

	public findById(id: Id): IProduct | null {
		throw new Error('Not Implemented');
	}

	public remove(id: Id): IProduct | null {
		throw new Error('Not Implemented');
	}
}
