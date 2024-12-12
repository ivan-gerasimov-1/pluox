import type { IExpenses } from '@root/core/domain/expenses/types';
import type { IUseCase } from '@root/core/domain/types';
import type { IExpensesStorage } from '@root/core/infrastructure/expensesStorage/types';
import type { IIdGenerator } from '@root/core/infrastructure/idGenerator/types';
import type { ITemporal } from '@root/core/infrastructure/temporal/types';
import { Expense } from '@root/core/modules/expense/domain/expenseEntity/expense';
import type { TExpenseCreateDTO } from '@root/core/modules/expense/domain/expenseEntity/types';

export interface ICreateExpenseUseCase extends IUseCase {
	execute(expense: TExpenseCreateDTO): void;
}

export class CreateExpenseUseCase implements ICreateExpenseUseCase {
	constructor(
		private readonly expenses: IExpenses,
		private readonly expensesStorage: IExpensesStorage,
		private readonly idGenerator: IIdGenerator,
		private readonly temporal: ITemporal,
	) {}

	public execute(payload: TExpenseCreateDTO): void {
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

		let expenses = this.expenses //
			.add(expense)
			.get();

		this.expensesStorage //
			.setItems(expenses);
	}
}
