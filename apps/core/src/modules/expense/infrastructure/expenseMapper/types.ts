import type { IMapper } from '@pluox/core/src/infrastructure/mapper/types';

import type { TExpenseDTO } from '@pluox/core/src/modules/expense/application/dto/expenseDTO';
import type { IExpense } from '@pluox/core/src/modules/expense/domain/expenseEntity/types';

export interface IExpenseMapper extends IMapper<TExpenseDTO, IExpense> {}
