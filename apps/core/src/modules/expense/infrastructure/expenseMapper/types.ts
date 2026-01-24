import type { IMapper } from '@core/infrastructure/mapper/types';

import type { TExpenseDTO } from '@core/modules/expense/application/dto/expenseDTO';
import type { IExpense } from '@core/modules/expense/domain/expenseEntity/types';

export interface IExpenseMapper extends IMapper<TExpenseDTO, IExpense> {}
