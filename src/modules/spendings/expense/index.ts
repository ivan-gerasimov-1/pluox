import { Expense } from '@modules/spendings/expense/expense';
import { IExpense } from '@modules/spendings/expense/types';

export { Expense, IExpense };

/** @deprecated Use Expense */
export const Spending = Expense;

/** @deprecated Use IExpense */
export interface ISpending extends IExpense {}
