import type { ICategories } from '@root/core/domain/categories/types';
import type { Id } from '@root/core/domain/types';
import type { IExpenseService } from '@root/core/modules/expense/application/expenseService/types';
import type { TExpenseCreateDTO } from '@root/core/modules/expense/domain/expenseEntity/types';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';
import type { ICreateExpenseUseCase } from '@root/core/modules/expense/domain/expenseUseCases/createExpenseUseCase';
import type { IDeleteExpenseUseCase } from '@root/core/modules/expense/domain/expenseUseCases/deleteExpenseUseCase';

export class ExpenseService implements IExpenseService {
	constructor(
		private readonly expenseRepository: IExpenseRepository,
		private readonly categories: ICategories,
		private readonly createExpenseUseCase: ICreateExpenseUseCase,
		private readonly deleteExpenseUseCase: IDeleteExpenseUseCase,
	) {}

	public createExpense(payload: TExpenseCreateDTO): IExpenseService {
		let expense = this.createExpenseUseCase.execute(payload);
		let expenseDTO = expense.toObject();

		this.expenseRepository.add(expense);

		if (expenseDTO.category) {
			this.categories.increaseWeight(expenseDTO.category);
		}

		return this;
	}

	public deleteExpense(id: Id): IExpenseService {
		let expenseDTO = this.expenseRepository.get(id);

		this.deleteExpenseUseCase.execute(id);

		if (expenseDTO.category) {
			this.categories.decreaseWeight(expenseDTO.category);
		}

		return this;
	}
}
