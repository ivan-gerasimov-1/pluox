import type { IMapper } from '@root/core/infrastructure/mapper/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import type { IExpense } from '@root/core/modules/expense/domain/expenseEntity/types';

export interface IExpenseMapper extends IMapper<TExpenseDTO, IExpense> {}
