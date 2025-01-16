import type { IDatabase } from '@root/core/infrastructure/database/types';
import { CategoryDataSource } from '@root/core/modules/category/infrastructure/categoryDataSource/categoryDataSource';
import { CATEGORY_STORAGE_ID } from '@root/core/modules/category/infrastructure/categoryDataSource/constants';
import type { ICategoryDataSource } from '@root/core/modules/category/infrastructure/categoryDataSource/types';

export function categoryDataSourceFactory(
	database: IDatabase,
): ICategoryDataSource {
	let collection = database.collection(CATEGORY_STORAGE_ID);

	return new CategoryDataSource(collection);
}
