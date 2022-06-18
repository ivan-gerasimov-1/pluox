import { useIntl } from '@modules/intl';
import { expenseListI18n } from '@modules/expenses/expense-list/expense-list.i18n';
import type { TExpense } from '@modules/expenses/expense/types';
import {
	$expenses,
	$expensesSelector,
	TExpensesStore,
} from '@modules/expenses/expenses.store';
import { formatCurrency } from '@root/utils/currency';
import { useSelector } from '@root/utils/store';

export function ExpenseList() {
	let intl = useIntl(expenseListI18n);
	let expenseList = useSelector<TExpensesStore, TExpense[]>(
		$expenses,
		$expensesSelector.list.fn,
		{
			field: $expensesSelector.list.field,
			defaultValue: [],
		}
	);

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<h1>{intl.translate('title')}</h1>
			</div>

			<ul>
				{expenseList?.map((item) => {
					return (
						<li key={item.id}>
							{new Date(item.dateCreated).toLocaleString()}
							<br />
							<strong>{formatCurrency(item.amount)}</strong>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
