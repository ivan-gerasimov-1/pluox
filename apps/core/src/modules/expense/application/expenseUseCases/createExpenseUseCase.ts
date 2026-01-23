import type { IIdGenerator } from '@pluox/core/src/domain/idGenerator/types';
import type { ITemporal } from '@pluox/core/src/domain/temporal/types';

import type { ICategoryUseCase } from '@pluox/core/src/modules/category/application/categoryUseCase/types';
import type { TExpenseCreateDTO } from '@pluox/core/src/modules/expense/application/dto/expenseDTO';
import type { ICreateExpenseUseCase } from '@pluox/core/src/modules/expense/application/expenseUseCases/types';
import type { IExpense } from '@pluox/core/src/modules/expense/domain/expenseEntity/types';
import type { IExpenseRepository } from '@pluox/core/src/modules/expense/domain/expenseRepository/types';
import type { IExpenseMapper } from '@pluox/core/src/modules/expense/infrastructure/expenseMapper/types';
import type { ISessionService } from '@pluox/core/src/modules/identity/application/sessionService/types';

export class CreateExpenseUseCase implements ICreateExpenseUseCase {
	constructor(
		private readonly expenseRepository: IExpenseRepository,
		private readonly expenseMapper: IExpenseMapper,
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

		let expense = this.expenseMapper.toEntity({
			id,
			userId,
			amount: expenseCreateDTO.amount,
			currency: expenseCreateDTO.currency,
			description: expenseCreateDTO.description,
			category: expenseCreateDTO.category,
			venue: expenseCreateDTO.venue,
			timezone,
			createdAt: currentDate,
			modifiedAt: currentDate,
			date: expenseCreateDTO.date ?? currentDate,
		});

		return expense;
	}
}
