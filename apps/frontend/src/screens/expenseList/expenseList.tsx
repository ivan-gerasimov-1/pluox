import { dateFn } from '@modules/date/date';
import { ExpenseList } from '@modules/expenses';
import { useIntl } from '@modules/intl';

import { expenseListI18n } from '@screens/expenseList/expenseList.i18n';

import { Header } from '@uiKit/header/header';
import { Screen } from '@uiKit/screen/screen';
/* import { ActionSheet } from '@root/uiKit/actionSheet';
import { EditExpense } from '@modules/expenses/editExpense/editExpense';
import { type Id } from '@domain/types';
import { useState } from 'react'; */

export function ExpenseListScreen() {
	let intl = useIntl(expenseListI18n);
	/* let [editItem, setEditItem] = useState<Id | null>(null); */

	let dateFrom = dateFn().startOf('month').toISOString();
	let dateTo = dateFn().endOf('month').toISOString();

	return (
		<Screen>
			<Header title={intl.translate('title')} />

			<ExpenseList
				dateFrom={dateFrom}
				dateTo={dateTo}
				/* onEdit={(id: Id) => setEditItem(id)} */
			/>

			{/* <ActionSheet isOpen={editItem !== null} onClose={() => setEditItem(null)}>
				{editItem ? <EditExpense itemId={editItem} /> : <div>—</div>}
			</ActionSheet> */}
		</Screen>
	);
}
