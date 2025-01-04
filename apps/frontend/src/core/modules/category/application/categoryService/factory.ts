import type { ITemporal } from '@root/core/domain/temporal/types';
import { CategoryService } from '@root/core/modules/category/application/categoryService/categoryService';
import type { ICategoryService } from '@root/core/modules/category/application/categoryService/types';
import type { ICategoryRepository } from '@root/core/modules/category/domain/categoryRepository/types';
import { categoryTemplates } from '@root/core/modules/category/domain/categoryTemplate/templates';
import type { ICategoryMapper } from '@root/core/modules/category/infrastructure/categoryMapper/types';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';

export interface ICategoryServiceFactory {
	create(): ICategoryService;
}

/**
 * @todo Remove category weights calculations once categories are persisted
 */
export class CategoryServiceFactory {
	constructor(
		private readonly categoryRepository: ICategoryRepository,
		private readonly categoryMapper: ICategoryMapper,
		private readonly temporal: ITemporal,
		private readonly expenseRepository: IExpenseRepository,
	) {}

	public create(): ICategoryService {
		let categories = new CategoryService(
			this.categoryRepository,
			this.categoryMapper,
		);

		let weight = 1;
		let currentDate = this.temporal.getISODateString();

		for (let categoryTemplate of categoryTemplates) {
			let category = this.categoryMapper.toEntity({
				id: categoryTemplate.id,
				name: categoryTemplate.name,
				icon: categoryTemplate.icon,
				weight,
				createdAt: currentDate,
				modifiedAt: currentDate,
			});

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
