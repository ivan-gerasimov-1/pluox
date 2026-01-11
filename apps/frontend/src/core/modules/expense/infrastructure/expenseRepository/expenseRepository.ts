import { Repository } from '@/core/infrastructure/repository/repository';

import type { TExpenseDTO } from '@/core/modules/expense/application/dto/expenseDTO';
import type { IExpense } from '@/core/modules/expense/domain/expenseEntity/types';
import type {
	IExpenseRepository,
	TExpenseFindOptions,
} from '@/core/modules/expense/domain/expenseRepository/types';
import type { IExpenseDataSource } from '@/core/modules/expense/infrastructure/expenseDataSource/types';
import type { IExpenseMapper } from '@/core/modules/expense/infrastructure/expenseMapper/types';

export class ExpenseRepository
	extends Repository<IExpense, TExpenseDTO, TExpenseFindOptions>
	implements IExpenseRepository
{
	constructor(
		private readonly expenseDataSource: IExpenseDataSource,
		private readonly expenseMapper: IExpenseMapper,
	) {
		super(expenseDataSource, expenseMapper);
	}
}
