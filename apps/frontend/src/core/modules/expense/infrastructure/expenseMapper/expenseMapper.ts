import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import { Expense } from '@root/core/modules/expense/domain/expenseEntity/expense';
import type { IExpense } from '@root/core/modules/expense/domain/expenseEntity/types';
import type { IExpenseMapper } from '@root/core/modules/expense/infrastructure/expenseMapper/types';

export class ExpenseMapper implements IExpenseMapper {
	public toDTO(expense: IExpense): TExpenseDTO {
		return {
			id: expense.id,
			userId: expense.userId,
			amount: expense.amount,
			currency: expense.currency,
			description: expense.description,
			category: expense.category,
			date: expense.date,
			createdAt: expense.createdAt,
			modifiedAt: expense.modifiedAt,
			timezone: expense.timezone,
		};
	}

	public toEntity(expenseDTO: TExpenseDTO): IExpense {
		return Expense.create(
			expenseDTO.id,
			expenseDTO.userId,
			expenseDTO.amount,
			expenseDTO.currency,
			expenseDTO.description,
			expenseDTO.category,
			expenseDTO.timezone,
			expenseDTO.createdAt,
			expenseDTO.modifiedAt,
			expenseDTO.date,
		);
	}
}
