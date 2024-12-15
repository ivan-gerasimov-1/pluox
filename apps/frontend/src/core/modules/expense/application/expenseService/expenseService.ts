import type { ICategories } from '@root/core/domain/categories/types';
import type { Id } from '@root/core/domain/types';
import type { IAppConfig } from '@root/core/infrastructure/appConfig/AppConfig';
import type { IExpenseService } from '@root/core/modules/expense/application/expenseService/types';
import type {
	TExpenseCreateDTO,
	TExpenseUpdateDTO,
} from '@root/core/modules/expense/domain/expenseEntity/types';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';
import type { ICreateExpenseUseCase } from '@root/core/modules/expense/domain/expenseUseCases/createExpenseUseCase';
import type { IDeleteExpenseUseCase } from '@root/core/modules/expense/domain/expenseUseCases/deleteExpenseUseCase';
import type { ITotalAmountUseCase } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/totalAmountUseCase';
import type {
	TYear,
	TMonth,
} from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/types';
import type { IUpdateExpenseUseCase } from '@root/core/modules/expense/domain/expenseUseCases/updateExpenseUseCase';

export class ExpenseService implements IExpenseService {
	constructor(
		private readonly appConfig: IAppConfig,
		private readonly expenseRepository: IExpenseRepository,
		private readonly categories: ICategories,
		private readonly createExpenseUseCase: ICreateExpenseUseCase,
		private readonly deleteExpenseUseCase: IDeleteExpenseUseCase,
		private readonly updateExpenseUseCase: IUpdateExpenseUseCase,
		private readonly totalAmountUseCase: ITotalAmountUseCase,
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

	public updateExpense(id: Id, payload: TExpenseUpdateDTO): IExpenseService {
		this.updateExpenseUseCase.execute(id, payload);

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

	public getTotalByYear(year: TYear = new Date().getFullYear()): number {
		return this.totalAmountUseCase.run(
			{
				year,
			},
			this.appConfig.currency,
		);
	}

	public getTotalByMonth(
		month: TMonth,
		year: TYear = new Date().getFullYear(),
	): number {
		return this.totalAmountUseCase.run(
			{
				month,
				year,
			},
			this.appConfig.currency,
		);
	}
}
