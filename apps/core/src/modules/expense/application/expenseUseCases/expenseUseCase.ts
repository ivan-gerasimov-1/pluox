import type { Id } from '@core/domain/types';
import type {
	TExpenseCreateDTO,
	TExpenseUpdateDTO,
} from '@core/modules/expense/application/dto/expenseDTO';
import type {
	ICreateExpenseUseCase,
	IDeleteExpenseUseCase,
	IExpenseUseCase,
	IUpdateExpenseUseCase,
} from '@core/modules/expense/application/expenseUseCases/types';

export class ExpenseUseCase implements IExpenseUseCase {
	constructor(
		private readonly createExpenseUseCase: ICreateExpenseUseCase,
		private readonly updateExpenseUseCase: IUpdateExpenseUseCase,
		private readonly deleteExpenseUseCase: IDeleteExpenseUseCase,
	) {}

	public create(expense: TExpenseCreateDTO): void {
		this.createExpenseUseCase.execute(expense);
	}

	public update(id: Id, expense: TExpenseUpdateDTO): void {
		this.updateExpenseUseCase.execute(id, expense);
	}

	public delete(id: Id): void {
		this.deleteExpenseUseCase.execute(id);
	}
}
