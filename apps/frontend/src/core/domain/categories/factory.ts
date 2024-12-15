import { CategoryService } from '@root/core/domain/categories/categoryService';
import { categoryList } from '@domain/categories/constants';
import type { ICategoryService } from '@domain/categories/types';
import type { ITemporal } from '@root/core/infrastructure/temporal/types';
import { Category } from '@root/core/modules/category/domain/categoryEntity/category';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';

export interface ICategoryServiceFactory {
	create(): ICategoryService;
}

/**
 * @todo Remove category weights calculations once categories are persisted
 */
export class CategoryServiceFactory {
	constructor(
		private readonly temporal: ITemporal,
		private readonly expenseRepository: IExpenseRepository,
	) {}

	public create(): ICategoryService {
		let categories = new CategoryService();

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

	private calculateWeights(categories: ICategoryService) {
		let expenses = this.expenseRepository.get();

		for (let expense of expenses) {
			if (!expense.category) {
				continue;
			}

			categories.increaseWeight(expense.category);
		}
	}
}
