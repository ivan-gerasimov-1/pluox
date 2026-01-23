import type { Id } from '@pluox/core/src/domain/types';

import type { ICategoryUseCase } from '@pluox/core/src/modules/category/application/categoryUseCase/types';
import type { IDeleteExpenseUseCase } from '@pluox/core/src/modules/expense/application/expenseUseCases/types';
import type { IExpenseRepository } from '@pluox/core/src/modules/expense/domain/expenseRepository/types';

export class DeleteExpenseUseCase implements IDeleteExpenseUseCase {
	constructor(
		private readonly expenseRepository: IExpenseRepository,
		private readonly categoryUseCase: ICategoryUseCase,
	) {}

	public execute(id: Id): void {
		let expense = this.expenseRepository.findById(id);

		this.expenseRepository.remove(id);

		if (expense?.category) {
			this.categoryUseCase.decreaseWeight(expense.category);
		}
	}
}
