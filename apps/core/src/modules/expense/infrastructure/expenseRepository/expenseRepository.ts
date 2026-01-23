import { Repository } from '@pluox/core/src/infrastructure/repository/repository';

import type { TExpenseDTO } from '@pluox/core/src/modules/expense/application/dto/expenseDTO';
import type { IExpense } from '@pluox/core/src/modules/expense/domain/expenseEntity/types';
import type {
	IExpenseRepository,
	TExpenseFindOptions,
} from '@pluox/core/src/modules/expense/domain/expenseRepository/types';
import type { IExpenseDataSource } from '@pluox/core/src/modules/expense/infrastructure/expenseDataSource/types';
import type { IExpenseMapper } from '@pluox/core/src/modules/expense/infrastructure/expenseMapper/types';

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
