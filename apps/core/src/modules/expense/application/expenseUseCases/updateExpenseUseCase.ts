import type { Id, TCategory } from '@core/domain/types';
import type { ICategoryUseCase } from '@core/modules/category/application/categoryUseCase/types';
import type { TExpenseUpdateDTO } from '@core/modules/expense/application/dto/expenseDTO';
import type { IUpdateExpenseUseCase } from '@core/modules/expense/application/expenseUseCases/types';
import type { IExpenseRepository } from '@core/modules/expense/domain/expenseRepository/types';

/**
 * @todo
 * 1. Handle missing expense case
 */
export class UpdateExpenseUseCase implements IUpdateExpenseUseCase {
	constructor(
		private readonly expenseRepository: IExpenseRepository,
		private readonly categoryUseCase: ICategoryUseCase,
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
			payload.category === undefined ? expense.category : payload.category;
		expense.venue = payload.venue ?? expense.venue;

		this.expenseRepository.save(expense);

		if (isCategoryChanged) {
			this.updateCategoryWeights(prevCategory, expense.category);
		}
	}

	private updateCategoryWeights(
		prevCategory: TCategory | null,
		newCategory: TCategory | null,
	): void {
		if (prevCategory) {
			this.categoryUseCase.decreaseWeight(prevCategory);
		}

		if (newCategory) {
			this.categoryUseCase.increaseWeight(newCategory);
		}
	}
}
