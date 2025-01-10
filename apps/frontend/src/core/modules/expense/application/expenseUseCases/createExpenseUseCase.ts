import type { IIdGenerator } from '@root/core/domain/idGenerator/types';
import type { ITemporal } from '@root/core/domain/temporal/types';
import type { ICategoryUseCase } from '@root/core/modules/category/application/categoryUseCase/types';
import type { TExpenseCreateDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import type { ICreateExpenseUseCase } from '@root/core/modules/expense/application/expenseUseCases/types';
import { Expense } from '@root/core/modules/expense/domain/expenseEntity/expense';
import type { IExpense } from '@root/core/modules/expense/domain/expenseEntity/types';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';
import type { ISessionService } from '@root/core/modules/identity/application/sessionService/types';

export class CreateExpenseUseCase implements ICreateExpenseUseCase {
	constructor(
		private readonly expenseRepository: IExpenseRepository,
		private readonly categoryUseCase: ICategoryUseCase,
		private readonly sessionService: ISessionService,
		private readonly idGenerator: IIdGenerator,
		private readonly temporal: ITemporal,
	) {}

	public execute(payload: TExpenseCreateDTO): IExpense {
		let expense = this.createExpense(payload);

		this.expenseRepository.save(expense);

		if (expense.category) {
			this.categoryUseCase.increaseWeight(expense.category);
		}

		return expense;
	}

	private createExpense(expenseCreateDTO: TExpenseCreateDTO): IExpense {
		let id = this.idGenerator.getId();
		let userId = this.sessionService.userId;
		let currentDate = this.temporal.getISODateString();
		let timezone = this.temporal.getTimezone();

		let expense = Expense.create(
			id,
			userId,
			expenseCreateDTO.amount,
			expenseCreateDTO.currency,
			expenseCreateDTO.description,
			expenseCreateDTO.category,
			timezone,
			currentDate,
			currentDate,
			expenseCreateDTO.date,
		);

		return expense;
	}
}
