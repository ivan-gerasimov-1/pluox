import { Categories } from '@domain/categories/Categories';
import { categoryList } from '@domain/categories/constants';
import type { ICategories } from '@domain/categories/types';
import type { ITemporal } from '@root/core/infrastructure/temporal/types';
import { Category } from '@root/core/modules/category/category';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';

export interface ICategoriesFactory {
	create(): ICategories;
}

/**
 * @todo Remove category weights calculations once categories are persisted
 */
export class CategoriesFactory {
	constructor(
		private readonly temporal: ITemporal,
		private readonly expenseRepository: IExpenseRepository,
	) {}

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

		this.calculateWeights(categories);

		return categories;
	}

	private calculateWeights(categories: ICategories) {
		let expenses = this.expenseRepository.get();

		for (let expense of expenses) {
			if (!expense.category) {
				continue;
			}

			categories.increaseWeight(expense.category);
		}
	}
}
