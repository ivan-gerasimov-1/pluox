import { LocalStorageCollectionDataSource } from '@root/core/infrastructure/dataSource/localStorageCollectionDataSource';
import type { TProductDTO } from '@root/core/modules/product/application/dto/productDTO';
import type { TProductFindOptions } from '@root/core/modules/product/domain/productRepository/types';
import type { IProductDataSource } from '@root/core/modules/product/infrastructure/productDataSource/types';
import type { ICustomStorage } from '@root/core/infrastructure/customStorage/types';

const PRODUCT_STORAGE_ID = 'products';

export function productDataSourceFactory(
	customStorage: ICustomStorage,
): IProductDataSource {
	let collection = customStorage.collection(PRODUCT_STORAGE_ID);

	return new LocalStorageCollectionDataSource<TProductDTO, TProductFindOptions>(
		collection,
	);
}
