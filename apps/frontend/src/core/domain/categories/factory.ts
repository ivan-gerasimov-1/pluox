import { Categories } from '@domain/categories/Categories';
import { categoryList } from '@domain/categories/constants';
import type { ICategories } from '@domain/categories/types';
import { Category } from '@domain/category/category';

export function categoriesFactory(): ICategories {
	let categories = new Categories();

	for (const categoryDto of categoryList) {
		let category = Category.create(
			categoryDto.id,
			categoryDto.name,
			categoryDto.icon,
			1,
		);

		categories.add(category);
	}

	return categories;
}
