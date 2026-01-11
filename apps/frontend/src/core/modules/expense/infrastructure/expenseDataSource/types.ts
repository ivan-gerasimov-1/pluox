import type { IDataSource } from '@/core/infrastructure/dataSource/types';
import type { TExpenseDTO } from '@/core/modules/expense/application/dto/expenseDTO';
import type { TExpenseFindOptions } from '@/core/modules/expense/domain/expenseRepository/types';

export interface IExpenseDataSource
	extends IDataSource<TExpenseDTO, TExpenseFindOptions> {}
