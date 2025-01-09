import type { ICategoryService } from '@root/core/modules/category/application/categoryService/types';
import type { Id } from '@root/core/domain/types';
import type { IAppConfig } from '@root/core/modules/settings/domain/appConfig/types';
import type { IExpenseService } from '@root/core/modules/expense/application/expenseService/types';
import type {
	TExpenseCreateDTO,
	TExpenseDTO,
	TExpenseUpdateDTO,
} from '@root/core/modules/expense/application/dto/expenseDTO';
import type { IExpenseRepository } from '@root/core/modules/expense/domain/expenseRepository/types';
import type { ICreateExpenseUseCase } from '@root/core/modules/expense/application/expenseUseCases/createExpenseUseCase';
import type { IDeleteExpenseUseCase } from '@root/core/modules/expense/application/expenseUseCases/deleteExpenseUseCase';
import type { IUpdateExpenseUseCase } from '@root/core/modules/expense/application/expenseUseCases/updateExpenseUseCase';
import type {
	IMonthlyExpensesByCategoryUseCase,
	TMonthlyExpensesByCategory,
} from '@root/core/modules/expense/domain/expenseUseCases/monthlyExpensesByCategoryUseCase';
import type { TYear, TMonth } from '@root/core/domain/temporal/types';
import type {
	IExpenseGroupingService,
	TExpenseGroupByDate,
} from '@root/core/modules/expense/application/expenseGroupingService/types';
import type { IExpenseAmountService } from '@root/core/modules/expense/application/expenseAmountService/types';

export class ExpenseService implements IExpenseService {
	constructor(
		private readonly appConfig: IAppConfig,
		private readonly expenseRepository: IExpenseRepository,
		private readonly categoryService: ICategoryService,
		private readonly createExpenseUseCase: ICreateExpenseUseCase,
		private readonly deleteExpenseUseCase: IDeleteExpenseUseCase,
		private readonly updateExpenseUseCase: IUpdateExpenseUseCase,
		private readonly monthlyExpensesByCategoryUseCase: IMonthlyExpensesByCategoryUseCase,
		private readonly expenseGroupingService: IExpenseGroupingService,
		private readonly expenseAmountService: IExpenseAmountService,
	) {}

	public createExpense(payload: TExpenseCreateDTO): IExpenseService {
		let expense = this.createExpenseUseCase.execute(payload);

		this.expenseRepository.save(expense);

		if (expense.category) {
			this.categoryService.increaseWeight(expense.category);
		}

		return this;
	}

	public updateExpense(id: Id, payload: TExpenseUpdateDTO): IExpenseService {
		this.updateExpenseUseCase.execute(id, payload);

		return this;
	}

	public deleteExpense(id: Id): IExpenseService {
		let expense = this.expenseRepository.findById(id);

		this.deleteExpenseUseCase.execute(id);

		if (expense?.category) {
			this.categoryService.decreaseWeight(expense.category);
		}

		return this;
	}

	public getTotalByYear(year: TYear = new Date().getFullYear()): number {
		return this.expenseAmountService.getYearlyAmount(year);
	}

	public getTotalByMonth(
		month: TMonth,
		year: TYear = new Date().getFullYear(),
	): number {
		return this.expenseAmountService.getMonthlyAmount(month, year);
	}

	public getTotalByDay(): number {
		return this.expenseAmountService.getDailyAmount();
	}

	public getMonthlyExpensesByCategory(
		month: TMonth,
	): TMonthlyExpensesByCategory[] {
		return this.monthlyExpensesByCategoryUseCase.execute(month);
	}

	public groupExpenseByDate(expenses: TExpenseDTO[]): TExpenseGroupByDate[] {
		return this.expenseGroupingService.groupByDay(expenses);
	}
}
