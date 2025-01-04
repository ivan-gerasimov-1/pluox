import type { IUseCase } from '@root/core/domain/types';
import type { IIdGenerator } from '@root/core/infrastructure/idGenerator/types';
import type { ITemporal } from '@root/core/domain/temporal/types';
import type { TExpenseCreateDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import { Expense } from '@root/core/modules/expense/domain/expenseEntity/expense';
import type { IExpense } from '@root/core/modules/expense/domain/expenseEntity/types';

export interface ICreateExpenseUseCase extends IUseCase {
	execute(expense: TExpenseCreateDTO): IExpense;
}

export class CreateExpenseUseCase implements ICreateExpenseUseCase {
	constructor(
		private readonly idGenerator: IIdGenerator,
		private readonly temporal: ITemporal,
	) {}

	public execute(payload: TExpenseCreateDTO): IExpense {
		let id = this.idGenerator.getId();
		let currentDate = this.temporal.getISODateString();
		let timezone = this.temporal.getTimezone();

		let expense = Expense.create(
			id,
			payload.amount,
			payload.currency,
			payload.comment,
			payload.category,
			timezone,
			currentDate,
			currentDate,
			payload.date,
		);

		return expense;
	}
}
