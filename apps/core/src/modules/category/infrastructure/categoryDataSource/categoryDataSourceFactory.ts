import type { IDatabase } from '@core/infrastructure/database/types';

import { CategoryDataSource } from '@core/modules/category/infrastructure/categoryDataSource/categoryDataSource';
import { CATEGORY_STORAGE_ID } from '@core/modules/category/infrastructure/categoryDataSource/constants';
import type { ICategoryDataSource } from '@core/modules/category/infrastructure/categoryDataSource/types';

export function categoryDataSourceFactory(
	database: IDatabase,
): ICategoryDataSource {
	let collection = database.collection(CATEGORY_STORAGE_ID);

	return new CategoryDataSource(collection);
}
