import { ExpenseList } from '@modules/expenses';
import { useIntl } from '@modules/intl';
import { expenseListI18n } from '@screens/expenseList/expenseList.i18n';
import styles from './expenseList.module.css';
import { ActionSheet } from '@ui-kit/actionSheet';
import { EditExpense } from '@modules/expenses/editExpense/editExpense';
import { type Id } from '@domain/types';
import { useState } from 'react';

export function ExpenseListScreen() {
	let intl = useIntl(expenseListI18n);
	let [editItem, setEditItem] = useState<Id | null>(null);

	let currentDate = new Date();
	let dateFrom = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1,
	).toISOString();

	return (
		<>
			<div className={styles.header}>
				<h1>{intl.translate('title')}</h1>
			</div>

			<ExpenseList onEdit={(id: Id) => setEditItem(id)} dateFrom={dateFrom} />

			<ActionSheet isOpen={editItem !== null} onClose={() => setEditItem(null)}>
				{editItem ? <EditExpense itemId={editItem} /> : <div>—</div>}
			</ActionSheet>
		</>
	);
}
