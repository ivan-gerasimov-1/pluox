import type { Id, IUseCase } from '@root/core/domain/types';
import type {
	TExpenseCreateDTO,
	TExpenseUpdateDTO,
} from '@root/core/modules/expense/application/dto/expenseDTO';
import { IExpense } from '@root/core/modules/expense/domain/expenseEntity/types';

export interface IExpenseUseCase {
	create(expense: TExpenseCreateDTO): void;
	update(id: Id, expense: TExpenseUpdateDTO): void;
	delete(id: Id): void;
}

export interface ICreateExpenseUseCase extends IUseCase {
	execute(expense: TExpenseCreateDTO): IExpense;
}

export interface IDeleteExpenseUseCase extends IUseCase {
	execute(id: Id): void;
}

export interface IUpdateExpenseUseCase extends IUseCase {
	execute(id: Id, expense: TExpenseUpdateDTO): void;
}
