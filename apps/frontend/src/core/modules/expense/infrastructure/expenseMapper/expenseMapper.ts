import type { TExpenseDTO } from '@/core/modules/expense/application/dto/expenseDTO';
import { Expense } from '@/core/modules/expense/domain/expenseEntity/expense';
import type { IExpense } from '@/core/modules/expense/domain/expenseEntity/types';
import type { IExpenseMapper } from '@/core/modules/expense/infrastructure/expenseMapper/types';

export class ExpenseMapper implements IExpenseMapper {
	public toDTO(expense: IExpense): TExpenseDTO {
		return {
			id: expense.id,
			userId: expense.userId,
			amount: expense.amount,
			currency: expense.currency,
			description: expense.description,
			category: expense.category,
			venue: expense.venue,
			date: expense.date,
			createdAt: expense.createdAt,
			modifiedAt: expense.modifiedAt,
			timezone: expense.timezone,
		};
	}

	public toEntity(expenseDTO: TExpenseDTO): IExpense {
		return new Expense(
			expenseDTO.id,
			expenseDTO.userId,
			expenseDTO.amount,
			expenseDTO.currency,
			expenseDTO.description,
			expenseDTO.category,
			expenseDTO.venue,
			expenseDTO.timezone,
			expenseDTO.createdAt,
			expenseDTO.modifiedAt,
			expenseDTO.date,
		);
	}
}
