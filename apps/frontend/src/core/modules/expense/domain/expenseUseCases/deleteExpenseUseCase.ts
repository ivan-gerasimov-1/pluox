import type { IUseCase } from '@root/core/domain/types';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';

export interface IDeleteExpenseUseCase extends IUseCase {
	execute(id: string): void;
}

export class DeleteExpenseUseCase implements IDeleteExpenseUseCase {
	constructor(private readonly expenseRepository: IExpenseRepository) {}

	public execute(id: string): void {
		this.expenseRepository.remove(id);
	}
}
