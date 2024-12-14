import { Categories } from '@domain/categories/Categories';
import { categoryList } from '@domain/categories/constants';
import type { ICategories } from '@domain/categories/types';
import type { ITemporal } from '@root/core/infrastructure/temporal/types';
import { Category } from '@root/core/modules/category/category';

export interface ICategoriesFactory {
	create(): ICategories;
}

/**
 * @todo Calculate category weights on creation
 */
export class CategoriesFactory {
	constructor(private readonly temporal: ITemporal) {}

	public create(): ICategories {
		let categories = new Categories();

		let weight = 1;
		let currentDate = this.temporal.getISODateString();

		for (const categoryDto of categoryList) {
			let category = Category.create(
				categoryDto.id,
				categoryDto.name,
				categoryDto.icon,
				weight,
				currentDate,
			);

			categories.add(category);
		}

		return categories;
	}
}
