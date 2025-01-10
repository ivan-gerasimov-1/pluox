import type { ITemporal } from '@root/core/domain/temporal/types';
import { CategoryService } from '@root/core/modules/category/application/categoryService/categoryService';
import type { ICategoryService } from '@root/core/modules/category/application/categoryService/types';
import type { ICategoryUseCase } from '@root/core/modules/category/application/categoryUseCase/types';
import type { ICategoryRepository } from '@root/core/modules/category/domain/categoryRepository/types';
import { categoryTemplates } from '@root/core/modules/category/domain/categoryTemplate/templates';
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
		private readonly temporal: ITemporal,
		private readonly expenseRepository: IExpenseRepository,
		private readonly categoryUseCase: ICategoryUseCase,
	) {}

	public create(): ICategoryService {
		let categoryService = new CategoryService(this.categoryRepository);

		let weight = 1;
		let currentDate = this.temporal.getISODateString();

		for (let categoryTemplate of categoryTemplates) {
			this.categoryUseCase.create({
				id: categoryTemplate.id,
				name: categoryTemplate.name,
				icon: categoryTemplate.icon,
				weight,
				createdAt: currentDate,
				modifiedAt: currentDate,
			});
		}

		this.calculateWeights();

		return categoryService;
	}

	private calculateWeights() {
		let expenses = this.expenseRepository.findMany();

		for (let expense of expenses.items) {
			if (!expense.category) {
				continue;
			}

			this.categoryUseCase.increaseWeight(expense.category);
		}
	}
}
