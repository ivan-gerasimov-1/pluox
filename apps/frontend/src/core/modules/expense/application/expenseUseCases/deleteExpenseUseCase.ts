import type { Id } from '@root/core/domain/types';
import type { ICategoryService } from '@root/core/modules/category/application/categoryService/types';
import { IDeleteExpenseUseCase } from '@root/core/modules/expense/application/expenseUseCases/types';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';

export class DeleteExpenseUseCase implements IDeleteExpenseUseCase {
	constructor(
		private readonly expenseRepository: IExpenseRepository,
		private readonly categoryService: ICategoryService,
	) {}

	public execute(id: Id): void {
		let expense = this.expenseRepository.findById(id);

		this.expenseRepository.remove(id);

		if (expense?.category) {
			this.categoryService.decreaseWeight(expense.category);
		}
	}
}
