import { Expense } from '@modules/expenses/expense/expense';
import { IExpense } from '@modules/expenses/expense/types';

export { Expense, IExpense };

/** @deprecated Use Expense */
export const Spending = Expense;

/** @deprecated Use IExpense */
export interface ISpending extends IExpense {}
