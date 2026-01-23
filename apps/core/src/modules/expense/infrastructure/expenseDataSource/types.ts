import type { IDataSource } from '@pluox/core/src/infrastructure/dataSource/types';

import type { TExpenseDTO } from '@pluox/core/src/modules/expense/application/dto/expenseDTO';
import type { TExpenseFindOptions } from '@pluox/core/src/modules/expense/domain/expenseRepository/types';

export interface IExpenseDataSource
	extends IDataSource<TExpenseDTO, TExpenseFindOptions> {}
