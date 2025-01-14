import { LocalStorageCollectionDataSource } from '@root/core/infrastructure/dataSource/localStorageCollectionDataSource';
import type { TProductDTO } from '@root/core/modules/product/application/dto/productDTO';
import type { TProductFindOptions } from '@root/core/modules/product/domain/productRepository/types';
import type { IProductDataSource } from '@root/core/modules/product/infrastructure/productDataSource/types';

const PRODUCT_STORAGE_ID = 'products';

export function productDataSourceFactory(): IProductDataSource {
	return new LocalStorageCollectionDataSource<TProductDTO, TProductFindOptions>(
		window.localStorage,
		{
			id: PRODUCT_STORAGE_ID,
		},
	);
}
