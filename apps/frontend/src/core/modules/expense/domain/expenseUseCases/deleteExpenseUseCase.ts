import type { IUseCase } from '@root/core/domain/types';
import type { IExpensesStorage } from '@root/core/infrastructure/expensesStorage/types';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';

export interface IDeleteExpenseUseCase extends IUseCase {
	execute(id: string): void;
}

export class DeleteExpenseUseCase implements IDeleteExpenseUseCase {
	constructor(
		private readonly expenseRepository: IExpenseRepository,
		private readonly expensesStorage: IExpensesStorage,
	) {}

	public execute(id: string): void {
		let expenses = this.expenseRepository.delete(id).get();

		this.expensesStorage //
			.setItems(expenses);
	}
}
