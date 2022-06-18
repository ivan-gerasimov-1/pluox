import type { TExpense } from '@domain/expense/types';
import {
	$expenses,
	$expensesSelector,
	TExpensesStore,
} from '@modules/expenses/expenses.store';
import { formatCurrency } from '@root/utils/currency';
import { useSelector } from '@root/utils/store';
import { formatDate } from '@utils/date';

export function ExpenseList() {
	let expenseList = useSelector<TExpensesStore, TExpense[]>(
		$expenses,
		$expensesSelector.list.fn,
		{
			field: $expensesSelector.list.field,
			defaultValue: [],
		}
	);

	return (
		<ul>
			{expenseList?.map((item) => {
				return (
					<li key={item.id}>
						<strong>{formatCurrency(item.amount)}</strong>
						<br />
						{formatDate(item.dateCreated)}
					</li>
				);
			})}
		</ul>
	);
}
