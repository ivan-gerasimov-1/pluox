import { useIntl } from '@modules/intl';
import { spendingListI18n } from '@modules/spendings/spending-list/spending-list.i18n';
import type { TExpense } from '@modules/spendings/expense/types';
import {
	$expenses,
	$expensesSelector,
	TExpensesStore,
} from '@modules/spendings/expenses.store';
import { formatCurrency } from '@root/utils/currency';
import { useSelector } from '@root/utils/store';

export function SpendingList() {
	let intl = useIntl(spendingListI18n);
	let spendingsList = useSelector<TExpensesStore, TExpense[]>(
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
				{spendingsList?.map((item) => {
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
