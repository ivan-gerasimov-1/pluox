import { CategoryService } from '@root/core/modules/category/application/categoryService/categoryService';
import { categoryTemplates } from '@root/core/modules/category/domain/categoryTemplate/templates';
import type { ICategoryService } from '@root/core/modules/category/application/categoryService/types';
import type { ITemporal } from '@root/core/infrastructure/temporal/types';
import { Category } from '@root/core/modules/category/domain/categoryEntity/category';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';
import type { ICategoryRepository } from '@root/core/modules/category/domain/categoryRepository/types';

export interface ICategoryServiceFactory {
	create(): ICategoryService;
}

/**
 * @todo Remove category weights calculations once categories are persisted
 */
export class CategoryServiceFactory {
	constructor(
		private readonly categoryRepository: ICategoryRepository,
		private readonly temporal: ITemporal,
		private readonly expenseRepository: IExpenseRepository,
	) {}

	public create(): ICategoryService {
		let categories = new CategoryService(this.categoryRepository);

		let weight = 1;
		let currentDate = this.temporal.getISODateString();

		for (let categoryTemplate of categoryTemplates) {
			let category = Category.create(
				categoryTemplate.id,
				categoryTemplate.name,
				categoryTemplate.icon,
				weight,
				currentDate,
			);

			categories.create(category);
		}

		this.calculateWeights(categories);

		return categories;
	}

	private calculateWeights(categories: ICategoryService) {
		let expenses = this.expenseRepository.findMany();

		for (let expense of expenses.items) {
			if (!expense.category) {
				continue;
			}

			categories.increaseWeight(expense.category);
		}
	}
}
