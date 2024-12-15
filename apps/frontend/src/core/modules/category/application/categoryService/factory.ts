import { CategoryService } from '@root/core/modules/category/application/categoryService/categoryService';
import { categoryTemplates } from '@root/core/modules/category/domain/categoryTemplate/templates';
import type { ICategoryService } from '@root/core/modules/category/application/categoryService/types';
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

		for (const categoryDto of categoryTemplates) {
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
