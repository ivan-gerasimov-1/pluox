import { LocalStorageCollectionDataSource } from '@root/core/infrastructure/dataSource/localStorageCollectionDataSource';
import type { TProductDTO } from '@root/core/modules/product/application/dto/productDTO';
import type { TProductFindOptions } from '@root/core/modules/product/domain/productRepository/types';
import type { IProductDataSource } from '@root/core/modules/product/infrastructure/productDataSource/types';

export class ProductLocalStorageDataSource
	extends LocalStorageCollectionDataSource<TProductDTO, TProductFindOptions>
	implements IProductDataSource
{
	static readonly #STORAGE_ID = 'products';

	constructor() {
		super(ProductLocalStorageDataSource.#STORAGE_ID);
	}
}
