import { ExpenseList } from '@modules/expenses';
import { useIntl } from '@modules/intl';

import { expenseListI18n } from '@screens/expenseList/expenseList.i18n';

import { Header } from '@uiKit/header/header';
/* import { ActionSheet } from '@root/uiKit/actionSheet';
import { EditExpense } from '@modules/expenses/editExpense/editExpense';
import { type Id } from '@domain/types';
import { useState } from 'react'; */

export function ExpenseListScreen() {
	let intl = useIntl(expenseListI18n);
	/* let [editItem, setEditItem] = useState<Id | null>(null); */

	let currentDate = new Date();
	let dateFrom = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1,
	).toISOString();

	return (
		<>
			<Header title={intl.translate('title')} />

			<ExpenseList
				/* onEdit={(id: Id) => setEditItem(id)} */ dateFrom={dateFrom}
			/>

			{/* <ActionSheet isOpen={editItem !== null} onClose={() => setEditItem(null)}>
				{editItem ? <EditExpense itemId={editItem} /> : <div>—</div>}
			</ActionSheet> */}
		</>
	);
}
