import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import type { TExpenseFindOptions } from '@root/core/modules/expense/domain/expenseRepository/types';

export interface IExpenseDataSource
	extends IDataSource<TExpenseDTO, TExpenseFindOptions> {}
