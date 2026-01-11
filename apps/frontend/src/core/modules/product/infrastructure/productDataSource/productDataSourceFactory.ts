import type { IDatabase } from '@/core/infrastructure/database/types';
import { DataSource } from '@/core/infrastructure/dataSource/dataSource';

import type { TProductDTO } from '@/core/modules/product/application/dto/productDTO';
import type { TProductFindOptions } from '@/core/modules/product/domain/productRepository/types';
import type { IProductDataSource } from '@/core/modules/product/infrastructure/productDataSource/types';

const PRODUCT_STORAGE_ID = 'products';

export function productDataSourceFactory(
	customStorage: IDatabase,
): IProductDataSource {
	let collection = customStorage.collection(PRODUCT_STORAGE_ID);

	return new DataSource<TProductDTO, TProductFindOptions>(collection);
}
