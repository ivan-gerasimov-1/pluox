import { ExpenseList } from '@modules/expenses';
import { useIntl } from '@modules/intl';
import { expenseListI18n } from '@screens/expense-list/expense-list.i18n';
import styles from './expense-list.module.css';
import { ActionSheet } from '@components/action-sheet';
import { EditExpense } from '@modules/expenses/editExpense/editExpense';
import { type Id } from '@domain/types';
import { useState } from 'react';

export function ExpenseListScreen() {
	let intl = useIntl(expenseListI18n);
	let [editItem, setEditItem] = useState<Id | null>(null);

	return (
		<>
			<div className={styles.header}>
				<h1>{intl.translate('title')}</h1>
			</div>

			<ExpenseList onEdit={(id: Id) => setEditItem(id)} />

			{editItem && (
				<ActionSheet onClose={() => setEditItem(null)} isOpen>
					<EditExpense itemId={editItem} />
				</ActionSheet>
			)}
		</>
	);
}
