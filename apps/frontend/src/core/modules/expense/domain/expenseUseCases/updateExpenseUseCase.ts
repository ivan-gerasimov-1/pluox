import type { IUseCase } from '@root/core/domain/types';
import type { TExpenseUpdateDTO } from '@root/core/modules/expense/domain/expenseEntity/types';

export interface IUpdateExpenseUseCase extends IUseCase {
	execute(expense: TExpenseUpdateDTO): void;
}

export class UpdateExpenseUseCase implements IUpdateExpenseUseCase {
	constructor() {}

	/**
	 * @todo Add implementation
	 */
	public execute(payload: TExpenseUpdateDTO): void {
		throw new Error('Not implemented');
	}
}
