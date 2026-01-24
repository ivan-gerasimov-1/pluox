import type { IIdGenerator } from '@core/domain/idGenerator/types';
import type { ITemporal } from '@core/domain/temporal/types';
import type { Id } from '@core/domain/types';

import type { ICategoryInitializeUseCase } from '@core/modules/category/application/categoryUseCase/types';
import type { ICategory } from '@core/modules/category/domain/categoryEntity/types';
import type { ICategoryRepository } from '@core/modules/category/domain/categoryRepository/types';
import { categoryTemplates } from '@core/modules/category/domain/categoryTemplate/templates';
import type { ICategoryMapper } from '@core/modules/category/infrastructure/categoryMapper/types';
import type { IExpenseRepository } from '@core/modules/expense/domain/expenseRepository/types';
import type { ISessionService } from '@core/modules/identity/application/sessionService/types';

export class CategoryInitializeUseCase implements ICategoryInitializeUseCase {
	constructor(
		private readonly categoryRepository: ICategoryRepository,
		private readonly categoryMapper: ICategoryMapper,
		private readonly expenseRepository: IExpenseRepository,
		private readonly temporal: ITemporal,
		private readonly idGenerator: IIdGenerator,
		private readonly sessionService: ISessionService,
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
		/**
		 * @description
		 * This is only required to migrate already existing expenses, seems
		 * like not possible on production, could be deleted upon release.
		 *
		 * @todo
		 * 1. Clean up
		 */
		let templateIdToCategoryId = new Map<Id, Id>();
		let expenses = this.expenseRepository.findMany();

		let weight = 1;
		let currentDate = this.temporal.getISODateString();

		for (let categoryTemplate of categoryTemplates) {
			let id = this.idGenerator.getId();
			let userId = this.sessionService.userId;
			let category = this.categoryMapper.toEntity({
				id,
				userId,
				name: categoryTemplate.name,
				icon: categoryTemplate.icon,
				weight,
				createdAt: currentDate,
				modifiedAt: currentDate,
			});

			templateIdToCategoryId.set(categoryTemplate.id, id);
			newCategories.set(category.id, category);
		}

		for (let expense of expenses.items) {
			if (!expense.category) {
				continue;
			}

			/** @todo №1 */
			expense.category =
				templateIdToCategoryId.get(expense.category) ?? expense.category;

			this.expenseRepository.save(expense);

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
