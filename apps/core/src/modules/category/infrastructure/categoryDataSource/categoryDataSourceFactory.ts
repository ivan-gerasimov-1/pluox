import type { IDatabase } from '@pluox/core/src/infrastructure/database/types';

import { CategoryDataSource } from '@pluox/core/src/modules/category/infrastructure/categoryDataSource/categoryDataSource';
import { CATEGORY_STORAGE_ID } from '@pluox/core/src/modules/category/infrastructure/categoryDataSource/constants';
import type { ICategoryDataSource } from '@pluox/core/src/modules/category/infrastructure/categoryDataSource/types';

export function categoryDataSourceFactory(
	database: IDatabase,
): ICategoryDataSource {
	let collection = database.collection(CATEGORY_STORAGE_ID);

	return new CategoryDataSource(collection);
}
