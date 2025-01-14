import { LocalStorageCollectionDataSource } from '@root/core/infrastructure/dataSource/localStorageCollectionDataSource';
import type { TProductDTO } from '@root/core/modules/product/application/dto/productDTO';
import type { TProductFindOptions } from '@root/core/modules/product/domain/productRepository/types';
import type { IProductDataSource } from '@root/core/modules/product/infrastructure/productDataSource/types';

const PRODUCT_STORAGE_ID = 'products';

export function productDataSourceFactory(storage: Storage): IProductDataSource {
	return new LocalStorageCollectionDataSource<TProductDTO, TProductFindOptions>(
		storage,
		{
			id: PRODUCT_STORAGE_ID,
		},
	);
}
