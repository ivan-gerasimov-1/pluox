import { categoryTemplates } from '@root/core/modules/category/domain/categoryTemplate/templates';

import type { ITemporal } from '@root/core/domain/temporal/types';
import type { Id } from '@root/core/domain/types';
import type { ICategoryInitializeUseCase } from '@root/core/modules/category/application/categoryUseCase/types';
import type { ICategory } from '@root/core/modules/category/domain/categoryEntity/types';
import type { ICategoryRepository } from '@root/core/modules/category/domain/categoryRepository/types';
import type { ICategoryMapper } from '@root/core/modules/category/infrastructure/categoryMapper/types';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';

export class CategoryInitializeUseCase implements ICategoryInitializeUseCase {
	constructor(
		private readonly categoryRepository: ICategoryRepository,
		private readonly categoryMapper: ICategoryMapper,
		private readonly expenseRepository: IExpenseRepository,
		private readonly temporal: ITemporal,
	) {}

	public execute(): void {
		this.createCategoriesFromTemplates();
	}

	public createCategoriesFromTemplates(): void {
		let categories = this.categoryRepository.findMany();

		if (categories.total > 0) {
			return;
		}

		let newCategories = new Map<Id, ICategory>();
		let expenses = this.expenseRepository.findMany();

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

			newCategories.set(category.id, category);
		}

		for (let expense of expenses.items) {
			if (!expense.category) {
				continue;
			}

			// prettier-ignore
			newCategories //
				.get(expense.category)
				?.increaseWeight();
		}

		for (let category of newCategories.values()) {
			this.categoryRepository.save(category);
		}
	}
}
