import type { Id, IUseCase } from '@root/core/domain/types';
import type { TExpenseUpdateDTO } from '@root/core/modules/expense/application/dto/expenseDTO';

export interface IUpdateExpenseUseCase extends IUseCase {
	execute(id: Id, expense: TExpenseUpdateDTO): void;
}

export class UpdateExpenseUseCase implements IUpdateExpenseUseCase {
	constructor() {}

	/**
	 * @todo Add implementation
	 */
	public execute(id: Id, payload: TExpenseUpdateDTO): void {
		throw new Error('Not implemented');
	}
}
