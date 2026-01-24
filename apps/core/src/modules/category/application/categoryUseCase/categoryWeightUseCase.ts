import type { Id } from '@core/domain/types';

import {
	CategoryNotFoundError,
	InvalidCategoryWeightChangeCommandError,
} from '@core/modules/category/application/categoryUseCase/errors';
import type {
	ICategoryWeightUseCase,
	TCategoryWeightChangeCommand,
} from '@core/modules/category/application/categoryUseCase/types';
import type { ICategoryRepository } from '@core/modules/category/domain/categoryRepository/types';

export class CategoryWeightUseCase implements ICategoryWeightUseCase {
	constructor(private readonly categoryRepository: ICategoryRepository) {}

	public execute(id: Id, command: TCategoryWeightChangeCommand): void {
		this.changeWeight(id, command);
	}

	private changeWeight(id: Id, command: TCategoryWeightChangeCommand): void {
		let category = this.categoryRepository.findById(id);

		if (!category) {
			throw new CategoryNotFoundError(id);
		}

		switch (command) {
			case 'increase':
				category.increaseWeight();
				break;
			case 'decrease':
				category.decreaseWeight();
				break;
			default:
				throw new InvalidCategoryWeightChangeCommandError();
		}

		this.categoryRepository.save(category);
	}
}
