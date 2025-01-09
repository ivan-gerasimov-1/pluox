import type { Id, IUseCase, TCategory } from '@root/core/domain/types';
import type { ICategoryService } from '@root/core/modules/category/application/categoryService/types';
import type { TExpenseUpdateDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';

export interface IUpdateExpenseUseCase extends IUseCase {
	execute(id: Id, expense: TExpenseUpdateDTO): void;
}

/**
 * @todo
 * 1. Handle missing expense case
 */
export class UpdateExpenseUseCase implements IUpdateExpenseUseCase {
	constructor(
		private readonly expenseRepository: IExpenseRepository,
		private readonly categoryService: ICategoryService,
	) {}

	public execute(id: Id, payload: TExpenseUpdateDTO): void {
		let expense = this.expenseRepository.findById(id);

		let prevCategory = null;
		let isCategoryChanged = false;

		/** @todo №1 */
		if (!expense) {
			return;
		}

		if (payload.category) {
			prevCategory = expense.category;
			isCategoryChanged = expense.category !== payload.category;
		}

		expense.amount = payload.amount ?? expense.amount;
		expense.currency = payload.currency ?? expense.currency;
		expense.description = payload.description ?? expense.description;
		expense.date = payload.date ?? expense.date;
		expense.category =
			payload.category !== undefined ? payload.category : expense.category;

		this.expenseRepository.save(expense);

		if (isCategoryChanged) {
			this.updateCategoryWeights(prevCategory, expense.category);
		}
	}

	private updateCategoryWeights(
		prevCategory: TCategory,
		newCategory: TCategory,
	): void {
		if (prevCategory) {
			this.categoryService.decreaseWeight(prevCategory);
		}

		if (newCategory) {
			this.categoryService.increaseWeight(newCategory);
		}
	}
}
