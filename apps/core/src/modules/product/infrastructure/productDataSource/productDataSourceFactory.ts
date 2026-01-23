import type { IDatabase } from '@pluox/core/src/infrastructure/database/types';
import { DataSource } from '@pluox/core/src/infrastructure/dataSource/dataSource';

import type { TProductDTO } from '@pluox/core/src/modules/product/application/dto/productDTO';
import type { TProductFindOptions } from '@pluox/core/src/modules/product/domain/productRepository/types';
import type { IProductDataSource } from '@pluox/core/src/modules/product/infrastructure/productDataSource/types';

const PRODUCT_STORAGE_ID = 'products';

export function productDataSourceFactory(
	customStorage: IDatabase,
): IProductDataSource {
	let collection = customStorage.collection(PRODUCT_STORAGE_ID);

	return new DataSource<TProductDTO, TProductFindOptions>(collection);
}
