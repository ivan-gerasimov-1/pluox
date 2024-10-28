import { Amount } from '@domain/amount/Amount';
import { Expenses } from '@domain/expenses/expenses';

export function getTotalAmount(): number {
	let expenses = Expenses.getInstance();
	let amount = Amount.create(expenses);

	return amount.getTotalByYear();
}
