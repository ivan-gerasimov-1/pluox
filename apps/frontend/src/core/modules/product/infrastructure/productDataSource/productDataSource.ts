import { LocalStorageDataSource } from '@root/core/infrastructure/dataSource/dataSource';
import type { TProductDTO } from '@root/core/modules/product/application/dto/productDTO';
import type { IProductDataSource } from '@root/core/modules/product/infrastructure/productDataSource/types';

export class ProductLocalStorageDataSource
	extends LocalStorageDataSource<TProductDTO>
	implements IProductDataSource
{
	static readonly #STORAGE_ID = 'products';

	constructor() {
		super(ProductLocalStorageDataSource.#STORAGE_ID);
	}
}
