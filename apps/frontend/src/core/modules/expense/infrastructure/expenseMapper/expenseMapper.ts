import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import { Expense } from '@root/core/modules/expense/domain/expenseEntity/expense';
import type { IExpense } from '@root/core/modules/expense/domain/expenseEntity/types';
import type { IExpenseMapper } from '@root/core/modules/expense/infrastructure/expenseMapper/types';

export class ExpenseMapper implements IExpenseMapper {
	public toDTO(expense: IExpense): TExpenseDTO {
		return expense.toDTO();
	}

	public toEntity(expenseDTO: TExpenseDTO): IExpense {
		return Expense.create(
			expenseDTO.id,
			expenseDTO.amount,
			expenseDTO.currency,
			expenseDTO.comment,
			expenseDTO.category,
			expenseDTO.timezone,
			expenseDTO.createdAt,
			expenseDTO.modifiedAt,
			expenseDTO.date,
		);
	}
}
