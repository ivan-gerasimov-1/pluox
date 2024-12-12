import type { Id } from '@domain/types';
import type { TExpense } from '@root/core/modules/expense/domain/expenseEntity/types';

export type TExpenses = Record<Id, TExpense>;
